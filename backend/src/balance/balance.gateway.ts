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

import type { AuthenticatedWs, TSocketResponseModel } from '../common/types';
import { EBalanceSocketEvents } from './balance.types';

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

  // it can be implemented with redis or other storage for multiple instances
  private userSockets = new Map<string, Record<string, AuthenticatedWs>>();
  private subscribedUsers = new Set<string>();

  handleConnection(client: AuthenticatedWs) {
    const currentUserSockets = this.userSockets.get(client.user.sub);

    if (currentUserSockets) {
      currentUserSockets[client.connectionId] = client;

      return this.userSockets.set(client.user.sub, currentUserSockets);
    }

    this.userSockets.set(client.user.sub, {
      [client.connectionId]: client,
    });
  }

  handleDisconnect(client: AuthenticatedWs) {
    const currentUserSockets = this.userSockets.get(client.user.sub);

    if (!currentUserSockets) {
      return;
    }

    if (Object.keys(currentUserSockets).length > 1) {
      delete currentUserSockets[client.connectionId];

      return this.userSockets.set(client.user.sub, currentUserSockets);
    }

    this.subscribedUsers.delete(client.user.sub);
    this.userSockets.delete(client.user.sub);
  }

  @SubscribeMessage(EBalanceSocketEvents.SUBSCRIBE)
  handleSubscribe(
    @MessageBody() message: any,
    @ConnectedSocket() client: AuthenticatedWs,
  ) {
    const response: TSocketResponseModel = {
      data: { success: true },
      event: EBalanceSocketEvents.SUBSCRIBE,
    };

    this.subscribedUsers.add(client.user.sub);
    client.send(JSON.stringify(response));
  }

  sendUserBalance(user_id: number, balance: number) {
    const userSockets = this.userSockets.get(user_id.toString());

    if (!userSockets || !this.subscribedUsers.has(user_id.toString())) {
      return;
    }

    const response: TSocketResponseModel<{ balance: number }> = {
      data: { balance },
      event: EBalanceSocketEvents.BALANCE_UPDATE,
    };

    Object.values(userSockets).forEach((socket) => {
      if (socket.readyState === socket.OPEN) {
        socket.send(JSON.stringify(response));
      }
    });
  }

  broadcast(data: TSocketResponseModel) {
    this.server.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
