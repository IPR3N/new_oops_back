import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(messageDto: CreateMessageDto): Promise<Message> {
    console.log('Creating message with:', messageDto);
    const message = this.messageRepository.create({
      ...messageDto,
      senderId: messageDto.senderId,
      receiverId: messageDto.receiverId,
    });
    console.log('Message entity:', message);
    return this.messageRepository.save(message);
  }

  async getConversation(userId1: string, userId2: string): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where(
        '(message.senderId = :userId1 AND message.receiverId = :userId2) OR ' +
          '(message.senderId = :userId2 AND message.receiverId = :userId1)',
        { userId1, userId2 },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async getConversations(userId: any): Promise<any[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.receiver', 'receiver')
      .where('message.sender.id = :userId OR message.receiver.id = :userId', {
        userId,
      })
      .orderBy('message.createdAt', 'DESC')
      .getMany();

    // Group messages by the other user
    const conversationsMap = new Map<
      string,
      { lastMessage: Message; otherUser: any }
    >();
    for (const message of messages) {
      const otherUserId: any =
        message.sender.id === userId ? message.receiver.id : message.sender.id;
      const otherUser =
        message.sender.id === userId ? message.receiver : message.sender;

      if (!conversationsMap.has(otherUserId)) {
        conversationsMap.set(otherUserId, {
          lastMessage: message,
          otherUser: {
            id: otherUser.id,
            nom: otherUser.nom,
            prenom: otherUser.prenom,
          },
        });
      } else {
        const existing = conversationsMap.get(otherUserId);
        if (
          new Date(message.createdAt) > new Date(existing.lastMessage.createdAt)
        ) {
          conversationsMap.set(otherUserId, {
            lastMessage: message,
            otherUser: {
              id: otherUser.id,
              nom: otherUser.nom,
              prenom: otherUser.prenom,
            },
          });
        }
      }
    }

    return Array.from(conversationsMap.values()).map(
      ({ lastMessage, otherUser }) => ({
        otherUserId: otherUser.id,
        otherUserName: `${otherUser.nom} ${otherUser.prenom}`,
        lastMessage: lastMessage.content,
        lastMessageTime: lastMessage.createdAt,
      }),
    );
  }
}
