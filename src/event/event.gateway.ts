import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_RESPONSE_PARAMS } from 'src/utils/constant';

@WebSocketGateway()
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(EventGateway.name);

  afterInit() {
    this.logger.log('WebSocket initialized successfully');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected : ${client.id}`);
  }

  emitEvent<T extends keyof SOCKET_RESPONSE_PARAMS>(
    event: T,
    data: SOCKET_RESPONSE_PARAMS[T],
  ) {
    this.server.emit(event, data);
  }
}
