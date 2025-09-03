import {
  Controller,
  Get,
  Query,
  Res,
  HttpException,
  HttpStatus,
  Patch,
  Param,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Response } from 'express';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Endpoint SSE pour écouter les notifications en temps réel
  @Get('sse')
  streamNotifications(@Query('userId') userId: string, @Res() res: Response) {
    if (!userId || isNaN(Number(userId))) {
      res.status(400).send('userId est requis et doit être un nombre valide');
      return;
    }

    const parsedUserId = parseInt(userId, 10);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Ajouter le client SSE
    this.notificationService.addSseClient(parsedUserId, res);

    // Envoyer un message de connexion initial
    res.write(
      `data: ${JSON.stringify({
        message: 'Connexion SSE établie',
        userId: parsedUserId,
      })}\n\n`,
    );
  }

  // Récupérer les notifications d’un utilisateur
  @Get()
  async getNotifications(@Query('userId') userId: string) {
    if (!userId || isNaN(Number(userId))) {
      throw new HttpException(
        'userId est requis et doit être un nombre valide',
        HttpStatus.BAD_REQUEST,
      );
    }
    const parsedUserId = parseInt(userId, 10);
    return this.notificationService.getUserNotifications(parsedUserId);
  }

  // Marquer une notification comme lue
  @Patch(':id/read')
  async markAsRead(
    @Param('id') notificationId: string,
    @Query('userId') userId: string,
  ) {
    if (
      !notificationId ||
      isNaN(Number(notificationId)) ||
      !userId ||
      isNaN(Number(userId))
    ) {
      throw new HttpException(
        'notificationId et userId doivent être des nombres valides',
        HttpStatus.BAD_REQUEST,
      );
    }
    const parsedNotificationId = parseInt(notificationId, 10);
    const parsedUserId = parseInt(userId, 10);
    return this.notificationService.markAsRead(
      parsedNotificationId,
      parsedUserId,
    );
  }

  // @Get('sse')
  // streamNotifications(@Query('userId') userId: string, @Res() res: Response) {
  //   if (!userId || isNaN(Number(userId))) {
  //     res.status(400).send('userId est requis et doit être un nombre valide');
  //     return;
  //   }

  //   const parsedUserId = parseInt(userId, 10);
  //   res.setHeader('Content-Type', 'text/event-stream');
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.setHeader('Connection', 'keep-alive');
  //   res.flushHeaders();

  //   this.notificationService.addSseClient(parsedUserId, res);
  //   res.write(
  //     `data: ${JSON.stringify({ message: 'Connexion SSE établie', userId: parsedUserId })}\n\n`,
  //   );
  // }

  // @Get()
  // async getNotifications(@Query('userId') userId: string) {
  //   if (!userId || isNaN(Number(userId))) {
  //     throw new HttpException(
  //       'userId est requis et doit être un nombre valide',
  //       400,
  //     );
  //   }
  //   const parsedUserId = parseInt(userId, 10);
  //   return this.notificationService.getUserNotifications(parsedUserId);
  // }
}
