import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FrienshipService } from './frienship.service';
import { CreateFrienshipDto } from './dto/create-frienship.dto';
import { UpdateFrienshipDto } from './dto/update-frienship.dto';

@Controller('frienship')
export class FrienshipController {
  constructor(private readonly frienshipService: FrienshipService) {}

  @Post('send')
  sendRequest(@Body() data: { requesterId: number; receiverId: number }) {
    return this.frienshipService.sendFriendRequest(
      data.requesterId,
      data.receiverId,
    );
  }

  // @Post('accept')
  // acceptRequest(@Body() data: { requesterId: number; receiverId: number }) {
  //   console.log(data);

  //   return this.frienshipService.acceptFriendRequest(
  //     data.requesterId,
  //     data.receiverId,
  //   );
  // }
  @Post('accept')
  async acceptFriendRequest(
    @Body('requesterId') requesterId: number,
    @Body('receiverId') receiverId: number,
  ) {
    return this.frienshipService.acceptFriendRequest(requesterId, receiverId);
  }

  @Post('decline')
  declineRequest(@Body() data: { requesterId: number; receiverId: number }) {
    return this.frienshipService.declineFriendRequest(
      data.requesterId,
      data.receiverId,
    );
  }

  @Get('friends/:userId')
  getFriends(@Param('userId', ParseIntPipe) userId: number) {
    return this.frienshipService.getFriends(userId);
  }

  @Get('suggestions/:userId')
  suggestFriends(@Param('userId', ParseIntPipe) userId: number) {
    return this.frienshipService.suggestFriends(userId);
  }

  @Get('outgoing')
  async getOutgoingFriendRequests(
    @Query('userId') userId: string,
    @Query('status') status?: 'pending' | 'accepted' | 'all',
  ) {
    if (!userId) {
      throw new BadRequestException('userId est requis.');
    }
    return this.frienshipService.getOutgoingFriendRequests(
      parseInt(userId, 10),
      status,
    );
  }

  @Get('incoming')
  async getIncomingFriendRequests(
    @Query('userId') userId: string,
    @Query('status') status?: 'pending' | 'accepted' | 'all',
  ) {
    if (!userId) {
      throw new BadRequestException('userId est requis.');
    }
    return this.frienshipService.getIncomingFriendRequests(
      parseInt(userId, 10),
      status,
    );
  }

  @Post('cancel')
  async cancelFriendRequest(
    @Body() body: { requesterId: number; receiverId: number },
  ) {
    const { requesterId, receiverId } = body;
    if (!requesterId || !receiverId) {
      throw new BadRequestException(
        'Les IDs requesterId et receiverId sont requis.',
      );
    }
    return this.frienshipService.cancelFriendRequest(requesterId, receiverId);
  }

  @Post('remove')
  async removeFriend(
    @Body('userId') userId: number,
    @Body('friendId') friendId: number,
  ) {
    return this.frienshipService.removeFriend(userId, friendId);
  }

  @Post('unfollow')
  async unfollow(
    @Body('userId') userId: number,
    @Body('followedId') followedId: number,
  ) {
    return this.frienshipService.unfollow(userId, followedId);
  }
}
