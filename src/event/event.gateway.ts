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
import { EventService } from './event.service';

@WebSocketGateway()
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer() server: Server;
  public eventService: EventService;
  private logger: Logger = new Logger(EventGateway.name);

  afterInit() {
    this.logger.log('WebSocket initialized successfully');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected : ${client.id}`);

    (async () => {
      const events = await this.eventService.getEvents();
      this.emitEvent('LAST_EVENTS', events);
    })();
  }

  emitEvent<T extends keyof SOCKET_RESPONSE_PARAMS>(
    event: T,
    data: SOCKET_RESPONSE_PARAMS[T],
  ) {
    this.server.emit(event, data);
  }
}
