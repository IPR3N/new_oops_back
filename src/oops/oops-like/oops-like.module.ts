import { Module } from '@nestjs/common';
import { OopsLikeService } from './oops-like.service';
import { OopsLikeController } from './oops-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OopsLike } from './entities/oops-like.entity';
import { Oops } from '../entities/oop.entity';
import { User } from 'src/user/entities/user.entity';
import { OopsGateway } from '../oops-gateway/oops-geteway';

@Module({
  imports: [TypeOrmModule.forFeature([OopsLike, Oops, OopsLike, User])],
  controllers: [OopsLikeController],
  providers: [OopsLikeService, OopsGateway],
})
export class OopsLikeModule {}
