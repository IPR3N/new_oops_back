import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Notification } from './entities/notification.entity';
import { Cron, CronExpression } from '@nestjs/schedule'; // Ajout pour le scheduling
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  private sseClients: Array<{ id: number; res: Response }> = [];

  addSseClient(userId: number, res: Response) {
    this.sseClients.push({ id: userId, res });
    res.on('close', () => {
      this.sseClients = this.sseClients.filter(
        (client) => client.id !== userId,
      );
      console.log(`Client SSE ${userId} déconnecté`);
    });
    console.log(`Client SSE ${userId} connecté`);
    console.log(`Clients SSE actuels : ${this.sseClients.map((c) => c.id)}`);
  }

  private async sendAndStoreNotification(userId: number, message: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    const notification = this.notificationRepo.create({
      message,
      user,
      isRead: false,
    });
    await this.notificationRepo.save(notification);

    const clients = this.sseClients.filter((client) => client.id === userId);
    console.log(`Clients trouvés pour ${userId} : ${clients.length}`);
    if (clients.length === 0) {
      console.log(`Aucun client SSE connecté pour ${userId}`);
    }

    clients.forEach((client) => {
      const data = {
        id: notification.id,
        message: notification.message,
        createdAt: notification.createdAt.toISOString(),
        isRead: notification.isRead,
      };
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
      // console.log(`SSE envoyé à ${userId} : ${JSON.stringify(data)}`);
    });

    console.log(`Notification envoyée et stockée pour ${userId}: ${message}`);
  }

  async getUserNotifications(userId: number) {
    const notifications = await this.notificationRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
    return {
      notifications,
      total: notifications.length,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    };
  }

  async markAsRead(notificationId: number, userId: number) {
    const notification = await this.notificationRepo.findOne({
      where: { id: notificationId, user: { id: userId } },
    });
    if (!notification) {
      throw new NotFoundException('Notification non trouvée');
    }
    notification.isRead = true;
    return this.notificationRepo.save(notification);
  }

  @OnEvent('friend.request')
  async handleFriendRequestEvent(payload: {
    receiverId: number;
    requesterName: string;
  }) {
    const { receiverId, requesterName } = payload;
    const message = `${requesterName} vous a envoyé une demande d’amitié.`;
    await this.sendAndStoreNotification(receiverId, message);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanOldNotifications() {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() - 96);

    try {
      const result = await this.notificationRepo.delete({
        createdAt: LessThan(expirationDate),
      });
      console.log(
        `Nettoyage des notifications: ${result.affected || 0} notifications supprimées`,
      );
    } catch (error) {
      console.error('Erreur lors du nettoyage des notifications:', error);
    }
  }

  @OnEvent('friend.accepted')
  async handleFriendAcceptedEvent(payload: {
    receiverId: number;
    requesterName: string;
  }) {
    const { receiverId, requesterName } = payload;
    const message = `${requesterName} a accepté votre demande d’amitié.`;
    await this.sendAndStoreNotification(receiverId, message);
  }

  @OnEvent('friend.declined')
  async handleFriendDeclinedEvent(payload: {
    receiverId: number;
    requesterName: string;
  }) {
    const { receiverId, requesterName } = payload;
    const message = `${requesterName} a refusé votre demande d’amitié.`;
    await this.sendAndStoreNotification(receiverId, message);
  }

  @OnEvent('friend.cancelled')
  async handleFriendCancelledEvent(payload: {
    receiverId: number;
    requesterName: string;
  }) {
    const { receiverId, requesterName } = payload;
    const message = `${requesterName} a annulé sa demande d’amitié.`;
    await this.sendAndStoreNotification(receiverId, message);
  }
}
