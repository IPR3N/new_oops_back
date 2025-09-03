// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway({ cors: true })
// export class OopsGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   handleConnection(client: any) {
//     console.log(`Client connecté : ${client.id}`);
//   }

//   handleDisconnect(client: any) {
//     console.log(`Client déconnecté : ${client.id}`);
//   }

//   sendLikeUpdate(oopsId: number, likeCount: number) {
//     this.server.emit('oopsLiked', { oopsId, likeCount });
//   }
// }

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OopsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connecté : ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client déconnecté : ${client.id}`);
  }

  sendLikeUpdate(oopsId: number, likeCount: number) {
    if (this.server) {
      this.server.emit('oopsLiked', { oopsId, likeCount });
    } else {
      console.error('WebSocket server is not initialized');
    }
  }
}
