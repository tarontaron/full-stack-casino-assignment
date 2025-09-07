import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

import type { AuthenticatedWs } from '../common/types';

@WebSocketGateway({
  path: '/balance',
  cors: {
    origin: '*',
  },
})
export class BalanceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: AuthenticatedWs) {
    console.log(client.readyState, 'Client connected to BalanceGateway');
  }

  handleDisconnect(client: AuthenticatedWs) {
    console.log(client.readyState, 'Client disconnected from BalanceGateway');
  }

  @SubscribeMessage('subscribe')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: AuthenticatedWs,
  ) {
    console.log(client.user);
    // Echo back
    client.send(`Echo: ${JSON.stringify({ success: true })}`);
  }

  broadcast(data: any) {
    this.server.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
