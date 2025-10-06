// // import {
// //   ConnectedSocket,
// //   MessageBody,
// //   OnGatewayConnection,
// //   OnGatewayDisconnect,
// //   SubscribeMessage,
// //   WebSocketGateway,
// //   WebSocketServer,
// // } from '@nestjs/websockets';
// // import { Server, Socket } from 'socket.io';
// // import { InjectRepository } from '@nestjs/typeorm';
// // import { Repository } from 'typeorm';
// // import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
// // import { ProjectMessagesService } from '../project_messages.service';
// // import { CreateProjectMessageDto } from '../dto/create-project_message.dto';
// // import { JwtService } from '@nestjs/jwt';
// // import { Logger } from '@nestjs/common';

// // @WebSocketGateway({
// //   namespace: '/project-chat',
// //   cors: { origin: '*' },
// // })
// // export class ProjectChatGateway
// //   implements OnGatewayConnection, OnGatewayDisconnect
// // {
// //   @WebSocketServer() server: Server;
// //   private logger: Logger = new Logger('ProjectChatGateway');

// //   constructor(
// //     private projectMessagesService: ProjectMessagesService,
// //     @InjectRepository(ProjectMemberShip)
// //     private readonly membershipRepository: Repository<ProjectMemberShip>,
// //     private readonly jwtService: JwtService,
// //   ) {}

// //   async handleConnection(client: Socket) {
// //     this.logger.log(
// //       `Client connecté : ${client.id}, query : ${JSON.stringify(client.handshake.query)}, auth : ${JSON.stringify(client.handshake.auth)}`,
// //     );
// //     const userId = Number(client.handshake.query.userId);
// //     const projectId = Number(client.handshake.query.projectId);
// //     const token = client.handshake.auth.token;

// //     if (isNaN(userId) || isNaN(projectId)) {
// //       this.logger.error(
// //         `userId invalide : ${client.handshake.query.userId} ou projectId : ${client.handshake.query.projectId}`,
// //       );
// //       client.emit('error', { message: 'userId ou projectId invalide' });
// //       client.disconnect();
// //       return;
// //     }

// //     if (!token) {
// //       this.logger.error(`Aucun jeton fourni pour client ${client.id}`);
// //       client.emit('error', { message: 'Jeton requis' });
// //       client.disconnect();
// //       return;
// //     }

// //     try {
// //       const payload = this.jwtService.verify(token);
// //       this.logger.log(`Jeton vérifié, payload : ${JSON.stringify(payload)}`);
// //       if (payload.id !== userId) {
// //         this.logger.error(
// //           `ID utilisateur JWT ${payload.id} ne correspond pas à userId ${userId}`,
// //         );
// //         client.emit('error', { message: 'Jeton invalide' });
// //         client.disconnect();
// //         return;
// //       }

// //       const membership = await this.membershipRepository.findOne({
// //         where: {
// //           project: { id: projectId },
// //           user: { id: userId },
// //         },
// //       });

// //       if (!membership) {
// //         this.logger.error(
// //           `Utilisateur ${userId} n'est pas membre du projet ${projectId}`,
// //         );
// //         client.emit('error', {
// //           message: "Vous n'êtes pas membre de ce projet",
// //         });
// //         client.disconnect();
// //         return;
// //       }

// //       client.join(`project-${projectId}`);
// //       this.logger.log(`Utilisateur ${userId} a rejoint project-${projectId}`);

// //       const messages =
// //         await this.projectMessagesService.findAllByProject(projectId);
// //       this.logger.log(
// //         `Envoi de ${messages.length} messages précédents à client ${client.id}`,
// //       );
// //       client.emit('previousMessages', messages);
// //     } catch (error) {
// //       this.logger.error(
// //         `Erreur de connexion pour client ${client.id} : ${error.message}`,
// //       );
// //       client.emit('error', {
// //         message: `Erreur de connexion : ${error.message}`,
// //       });
// //       client.disconnect();
// //     }
// //   }

// //   handleDisconnect(client: Socket) {
// //     const projectId = client.handshake.query.projectId as string;
// //     const userId = client.handshake.query.userId as string;
// //     this.logger.log(
// //       `Client déconnecté : ${client.id}, Utilisateur : ${userId}`,
// //     );
// //     if (projectId) {
// //       client.leave(`project-${projectId}`);
// //     }
// //   }

// //   @SubscribeMessage('sendMessage')
// //   async handleMessage(
// //     @MessageBody() createMessageDto: CreateProjectMessageDto,
// //     @ConnectedSocket() client: Socket,
// //   ) {
// //     try {
// //       const userId = Number(client.handshake.query.userId);
// //       this.logger.log(
// //         `Message reçu de l'utilisateur ${userId} : ${JSON.stringify(createMessageDto)}`,
// //       );

// //       if (!createMessageDto.content || createMessageDto.content.trim() === '') {
// //         this.logger.warn(`Message vide de l'utilisateur ${userId}`);
// //         client.emit('error', { message: 'Le message ne peut pas être vide' });
// //         return { success: false, error: 'Message vide' };
// //       }

// //       const message = await this.projectMessagesService.create(
// //         createMessageDto,
// //         userId,
// //       );
// //       this.logger.log(`Message créé : ${JSON.stringify(message)}`);

// //       this.server
// //         .to(`project-${createMessageDto.projectId}`)
// //         .emit('newMessage', message);
// //       this.logger.log(
// //         `Message diffusé à project-${createMessageDto.projectId}`,
// //       );

// //       return { success: true, message };
// //     } catch (error) {
// //       this.logger.error(
// //         `Erreur lors de l'envoi du message de l'utilisateur ${client.handshake.query.userId} : ${error.message}`,
// //       );
// //       client.emit('error', { message: error.message });
// //       return { success: false, error: error.message };
// //     }
// //   }

// //   @SubscribeMessage('typing')
// //   handleTyping(
// //     @MessageBody() data: { projectId: number; isTyping: boolean },
// //     @ConnectedSocket() client: Socket,
// //   ) {
// //     const userId = client.handshake.query.userId;
// //     client.to(`project-${data.projectId}`).emit('userTyping', {
// //       userId,
// //       isTyping: data.isTyping,
// //     });
// //   }
// // }

// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
// import { ProjectMessagesService } from '../project_messages.service';
// import { CreateProjectMessageDto } from '../dto/create-project_message.dto';
// import { JwtService } from '@nestjs/jwt';
// import { Logger } from '@nestjs/common';

// @WebSocketGateway({
//   namespace: '/project-chat',
//   cors: { origin: '*' },
// })
// export class ProjectChatGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;
//   private logger: Logger = new Logger('ProjectChatGateway');

//   constructor(
//     private projectMessagesService: ProjectMessagesService,
//     @InjectRepository(ProjectMemberShip)
//     private readonly membershipRepository: Repository<ProjectMemberShip>,
//     private readonly jwtService: JwtService,
//   ) {}

//   async handleConnection(client: Socket) {
//     this.logger.log(
//       `Client connecté : ${client.id}, query : ${JSON.stringify(client.handshake.query)}, auth : ${JSON.stringify(client.handshake.auth)}`,
//     );
//     const userId = Number(client.handshake.query.userId);
//     const projectId = Number(client.handshake.query.projectId);
//     const token = client.handshake.auth.token;

//     if (isNaN(userId) || isNaN(projectId)) {
//       this.logger.error(
//         `userId invalide : ${client.handshake.query.userId} ou projectId : ${client.handshake.query.projectId}`,
//       );
//       client.emit('error', { message: 'userId ou projectId invalide' });
//       client.disconnect();
//       return;
//     }

//     if (!token) {
//       this.logger.error(`Aucun jeton fourni pour client ${client.id}`);
//       client.emit('error', { message: 'Jeton requis' });
//       client.disconnect();
//       return;
//     }

//     try {
//       const payload = this.jwtService.verify(token);
//       this.logger.log(`Jeton vérifié, payload : ${JSON.stringify(payload)}`);
//       if (payload.id !== userId) {
//         this.logger.error(
//           `ID utilisateur JWT ${payload.id} ne correspond pas à userId ${userId}`,
//         );
//         client.emit('error', { message: 'Jeton invalide' });
//         client.disconnect();
//         return;
//       }

//       const membership = await this.membershipRepository.findOne({
//         where: {
//           project: { id: projectId },
//           user: { id: userId },
//         },
//       });

//       if (!membership) {
//         this.logger.error(
//           `Utilisateur ${userId} n'est pas membre du projet ${projectId}`,
//         );
//         client.emit('error', {
//           message: "Vous n'êtes pas membre de ce projet",
//         });
//         client.disconnect();
//         return;
//       }

//       client.join(`project-${projectId}`);
//       this.logger.log(`Utilisateur ${userId} a rejoint project-${projectId}`);

//       const messages =
//         await this.projectMessagesService.findAllByProject(projectId);
//       this.logger.log(
//         `Envoi de previousMessages : ${JSON.stringify(messages)}`,
//       );
//       client.emit('previousMessages', messages);
//     } catch (error) {
//       this.logger.error(
//         `Erreur de connexion pour client ${client.id} : ${error.message}`,
//       );
//       client.emit('error', {
//         message: `Erreur de connexion : ${error.message}`,
//       });
//       client.disconnect();
//     }
//   }

//   handleDisconnect(client: Socket) {
//     const projectId = client.handshake.query.projectId as string;
//     const userId = client.handshake.query.userId as string;
//     this.logger.log(
//       `Client déconnecté : ${client.id}, Utilisateur : ${userId}`,
//     );
//     if (projectId) {
//       client.leave(`project-${projectId}`);
//     }
//   }

//   @SubscribeMessage('sendMessage')
//   async handleMessage(
//     @MessageBody() createMessageDto: CreateProjectMessageDto,
//     @ConnectedSocket() client: Socket,
//   ) {
//     try {
//       const userId = Number(client.handshake.query.userId);
//       this.logger.log(
//         `Message reçu de l'utilisateur ${userId} : ${JSON.stringify(createMessageDto)}`,
//       );

//       if (!createMessageDto.content || createMessageDto.content.trim() === '') {
//         this.logger.warn(`Message vide de l'utilisateur ${userId}`);
//         client.emit('error', { message: 'Le message ne peut pas être vide' });
//         return { success: false, error: 'Message vide' };
//       }

//       const message = await this.projectMessagesService.create(
//         createMessageDto,
//         userId,
//       );
//       this.logger.log(
//         `Message créé pour newMessage : ${JSON.stringify(message)}`,
//       );

//       this.server
//         .to(`project-${createMessageDto.projectId}`)
//         .emit('newMessage', message);
//       this.logger.log(
//         `Message diffusé à project-${createMessageDto.projectId}`,
//       );

//       return { success: true, message };
//     } catch (error) {
//       this.logger.error(
//         `Erreur lors de l'envoi du message de l'utilisateur ${client.handshake.query.userId} : ${error.message}`,
//       );
//       client.emit('error', { message: error.message });
//       return { success: false, error: error.message };
//     }
//   }

//   @SubscribeMessage('typing')
//   handleTyping(
//     @MessageBody() data: { projectId: number; isTyping: boolean },
//     @ConnectedSocket() client: Socket,
//   ) {
//     const userId = client.handshake.query.userId;
//     client.to(`project-${data.projectId}`).emit('userTyping', {
//       userId,
//       isTyping: data.isTyping,
//     });
//   }
// }

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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { ProjectMessagesService } from '../project_messages.service';
import { CreateProjectMessageDto } from '../dto/create-project_message.dto';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/project-chat',
})
export class ProjectChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ProjectChatGateway');

  constructor(
    private projectMessagesService: ProjectMessagesService,
    @InjectRepository(ProjectMemberShip)
    private readonly membershipRepository: Repository<ProjectMemberShip>,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(
      `Client connecté : ${client.id}, query : ${JSON.stringify(client.handshake.query)}, auth : ${JSON.stringify(client.handshake.auth)}`,
    );
    const userId = Number(client.handshake.query.userId);
    const projectId = Number(client.handshake.query.projectId);
    const token = client.handshake.auth.token;

    if (isNaN(userId) || isNaN(projectId)) {
      this.logger.error(
        `userId invalide : ${client.handshake.query.userId} ou projectId : ${client.handshake.query.projectId}`,
      );
      client.emit('error', { message: 'userId ou projectId invalide' });
      client.disconnect();
      return;
    }

    if (!token) {
      this.logger.error(`Aucun jeton fourni pour client ${client.id}`);
      client.emit('error', { message: 'Jeton requis' });
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify(token);
      this.logger.log(`Jeton vérifié, payload : ${JSON.stringify(payload)}`);
      if (payload.id !== userId) {
        this.logger.error(
          `ID utilisateur JWT ${payload.id} ne correspond pas à userId ${userId}`,
        );
        client.emit('error', { message: 'Jeton invalide' });
        client.disconnect();
        return;
      }

      this.membershipRepository
        .findOne({
          where: {
            project: { id: projectId },
            user: { id: userId },
          },
        })
        .then((membership) => {
          if (!membership) {
            this.logger.error(
              `Utilisateur ${userId} n'est pas membre du projet ${projectId}`,
            );
            client.emit('error', {
              message: "Vous n'êtes pas membre de ce projet",
            });
            client.disconnect();
            return;
          }

          client.join(`project-${projectId}`);
          this.logger.log(
            `Utilisateur ${userId} a rejoint project-${projectId}`,
          );

          this.projectMessagesService
            .findAllByProject(projectId)
            .then((messages) => {
              this.logger.log(
                `Envoi de ${messages.length} messages précédents à client ${client.id}`,
              );
              client.emit('previousMessages', messages);
            })
            .catch((error) => {
              this.logger.error(
                `Erreur lors de la récupération des messages : ${error.message}`,
              );
              client.emit('error', {
                message: 'Erreur lors du chargement des messages',
              });
            });
        })
        .catch((error) => {
          this.logger.error(
            `Erreur de vérification d'adhésion : ${error.message}`,
          );
          client.emit('error', { message: 'Erreur de connexion' });
          client.disconnect();
        });
    } catch (error) {
      this.logger.error(
        `Erreur de connexion pour client ${client.id} : ${error.message}`,
      );
      client.emit('error', {
        message: `Erreur de connexion : ${error.message}`,
      });
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const projectId = client.handshake.query.projectId as string;
    const userId = client.handshake.query.userId as string;
    this.logger.log(
      `Client déconnecté : ${client.id}, Utilisateur : ${userId}`,
    );
    if (projectId) {
      client.leave(`project-${projectId}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createMessageDto: CreateProjectMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = Number(client.handshake.query.userId);
      this.logger.log(
        `Message reçu de l'utilisateur ${userId} : ${JSON.stringify(createMessageDto)}`,
      );

      if (!createMessageDto.content || createMessageDto.content.trim() === '') {
        this.logger.warn(`Message vide de l'utilisateur ${userId}`);
        client.emit('error', { message: 'Le message ne peut pas être vide' });
        return { success: false, error: 'Message vide' };
      }

      const message = await this.projectMessagesService.create(
        createMessageDto,
        userId,
      );
      this.logger.log(`Message créé : ${JSON.stringify(message)}`);

      this.server
        .to(`project-${createMessageDto.projectId}`)
        .emit('newMessage', message);
      this.logger.log(
        `Message diffusé à project-${createMessageDto.projectId}`,
      );

      return { success: true, message };
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi du message de l'utilisateur ${client.handshake.query.userId} : ${error.message}`,
      );
      client.emit('error', { message: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(client: Socket, projectId: string) {
    client.join(`project-${projectId}`);
    this.logger.log(
      `Client ${client.id} a rejoint la salle project-${projectId}`,
    );
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { projectId: number; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId;
    client.to(`project-${data.projectId}`).emit('userTyping', {
      userId,
      isTyping: data.isTyping,
    });
  }
}
