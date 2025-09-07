import { WsAdapter } from '@nestjs/platform-ws';
import { WebSocket } from 'ws';
import jwt from 'jsonwebtoken';

import { AUTH_ERRORS } from '../constants/errors';

import type { ApplicationJWT, AuthenticatedWs } from '../types';
import { JWT_SECRET } from '../constants/env';

export class WsAuthorizedAdapter extends WsAdapter {
  create(port: number, options?: any): any {
    const server = super.create(port, options);

    server.on('connection', (ws: WebSocket, req: any) => {
      const token = this.extractToken(req);
      if (!token) {
        ws.close(1008, AUTH_ERRORS.MISSING_TOKEN);

        return server;
      }

      try {
        const payload = jwt.verify(token, JWT_SECRET) as ApplicationJWT;
        (ws as unknown as AuthenticatedWs).user = payload;
      } catch (err) {
        console.log(err);
        ws.close(1008, AUTH_ERRORS.INVALID_TOKEN);
      }
    });

    return server;
  }

  private extractToken(req: any): string | null {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split('Bearer ')[1];
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    return url.searchParams.get('access_token');
  }
}
