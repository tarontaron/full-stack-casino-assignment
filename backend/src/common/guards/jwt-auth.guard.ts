import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';

import type { ApplicationJWT } from '../types';
import { AUTH_ERRORS } from '../constants/errors';
import { JWT_SECRET } from '../constants/env';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException(AUTH_ERRORS.MISSING_TOKEN);
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as ApplicationJWT;
      req.user = payload;

      return true;
    } catch (e) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }
  }
}
