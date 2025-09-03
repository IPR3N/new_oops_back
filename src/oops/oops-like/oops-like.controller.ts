import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OopsLikeService } from './oops-like.service';
import { CreateOopsLikeDto } from './dto/create-oops-like.dto';
import { UpdateOopsLikeDto } from './dto/update-oops-like.dto';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Controller('oops-like')
export class OopsLikeController {
  constructor(private readonly oopsLikeService: OopsLikeService) {}

  @Post()
  async toggleLike(
    @Body() createOopsLikeDto: CreateOopsLikeDto,
    @CurrentUser() user: User,
  ) {
    return this.oopsLikeService.toggleLike(createOopsLikeDto, user);
  }
}
