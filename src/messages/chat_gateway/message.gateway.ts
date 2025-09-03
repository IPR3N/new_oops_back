import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessagesService } from '../messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');

  constructor(private chatService: MessagesService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: CreateMessageDto) {
    const message = await this.chatService.createMessage(payload);
    this.server
      .to(payload.receiverId.toString())
      .emit('receiveMessage', message);
    this.server.to(payload.senderId.toString()).emit('receiveMessage', message);
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(client: Socket, userId: string) {
    client.join(userId);
    this.logger.log(`Client ${client.id} joined room ${userId}`);
  }
}
