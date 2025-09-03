import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { Repository } from 'typeorm';
import { ProjectMessagesService } from '../project_messages.service';
import { CreateProjectMessageDto } from '../dto/create-project_message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class ProjectChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private projectMessagesService: ProjectMessagesService,
    @InjectRepository(ProjectMemberShip)
    private readonly membershipRepository: Repository<ProjectMemberShip>,
  ) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const projectId = client.handshake.query.projectId as string;

    // Vérifier si l'utilisateur est membre du projet
    const membership = await this.membershipRepository.findOne({
      where: {
        project: { id: Number(projectId) },
        user: { id: Number(userId) },
      },
    });
    if (!membership) {
      client.disconnect();
      return;
    }

    // Joindre la room du projet
    client.join(`project-${projectId}`);
  }

  handleDisconnect(client: Socket) {
    const projectId = client.handshake.query.projectId as string;
    client.leave(`project-${projectId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createMessageDto: CreateProjectMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = Number(client.handshake.query.userId);

    const message = await this.projectMessagesService.create(
      createMessageDto,
      // userId,
    );

    
    this.server
      .to(`project-${createMessageDto.projectId}`)
      .emit('newMessage', message);

    return message;
  }

  @SubscribeMessage('sendFile')
  async handleFile(
    @MessageBody() data: { projectId: number; file: any },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = Number(client.handshake.query.userId);
    const { projectId } = data;

    throw new Error('File uploads must be handled via HTTP endpoint');
  }
}
