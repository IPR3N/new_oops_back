import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { OopsCommentService } from './oops-comment.service';
import { CreateOopsCommentDto } from './dto/create-oops-comment.dto';
import { UpdateOopsCommentDto } from './dto/update-oops-comment.dto';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('oops-comment')
export class OopsCommentController {
  constructor(private readonly oopsCommentService: OopsCommentService) {}

  @Post()
  create(
    @Body() createOopsCommentDto: CreateOopsCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.oopsCommentService.create(createOopsCommentDto, user);
  }

  @Get()
  findAll() {
    return this.oopsCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oopsCommentService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOopsCommentDto: UpdateOopsCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.oopsCommentService.update(id, updateOopsCommentDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oopsCommentService.remove(+id);
  }
}
