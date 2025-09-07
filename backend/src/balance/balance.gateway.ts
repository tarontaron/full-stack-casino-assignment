import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

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

  handleConnection(client: WebSocket) {
    console.log(client.readyState, 'Client connected to BalanceGateway');
  }

  handleDisconnect(client: WebSocket) {
    console.log(client.readyState, 'Client disconnected from BalanceGateway');
  }

  @SubscribeMessage('subscribe')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: WebSocket,
  ) {
    console.log('Received:', message);
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
