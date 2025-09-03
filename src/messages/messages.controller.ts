import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('conversation/:userId')
  async getConversation(@Req() req, @Param('userId') userId: string) {
    const currentUserId = req.user.id;
    return this.messagesService.getConversation(currentUserId, userId);
  }

  @Get('conversations')
  async getConversations(@Req() req) {
    const currentUserId = req.user.id;
    return this.messagesService.getConversations(currentUserId);
  }

  @Post('message')
  async createMessage(@Req() req, @Body() messageDto: CreateMessageDto) {
    console.log('Received messageDto:', messageDto);
    const currentUserId = req.user.id;

    if (!messageDto.senderId || !messageDto.receiverId || !messageDto.content) {
      throw new BadRequestException(
        'senderId, receiverId, and content are required',
      );
    }

    if (messageDto.senderId !== currentUserId) {
      throw new BadRequestException(
        'Unauthorized: senderId must match authenticated user',
      );
    }

    return this.messagesService.createMessage({
      ...messageDto,
      senderId: messageDto.senderId,
      receiverId: messageDto.receiverId,
    });
  }

  // @Post('message')
  // async createMessage(@Req() req, @Body() messageDto: CreateMessageDto) {
  //   const currentUserId = req.user.id;
  //   if (messageDto.senderId !== currentUserId) {
  //     throw new Error('Unauthorized: senderId must match authenticated user');
  //   }
  //   return this.messagesService.createMessage(messageDto);
  // }
}
