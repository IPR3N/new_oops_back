import { Module } from '@nestjs/common';
import { OopsCommentService } from './oops-comment.service';
import { OopsCommentController } from './oops-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OopsComment } from './entities/oops-comment.entity';
import { OopsLike } from '../oops-like/entities/oops-like.entity';
import { Oops } from '../entities/oop.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oops, OopsComment, OopsLike, User])],
  controllers: [OopsCommentController],
  providers: [OopsCommentService],
})
export class OopsCommentModule {}
