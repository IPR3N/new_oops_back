import { Module } from '@nestjs/common';
import { OopsService } from './oops.service';
import { OopsController } from './oops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oops } from './entities/oop.entity';
import { User } from 'src/user/entities/user.entity';
import { OopsLike } from './oops-like/entities/oops-like.entity';
import { OopsComment } from './oops-comment/entities/oops-comment.entity';
import { OopsBrouillonModule } from './oops-brouillon/oops-brouillon.module';

@Module({
  imports: [TypeOrmModule.forFeature([Oops, OopsComment, OopsLike, User])],
  controllers: [OopsController],
  providers: [OopsService],
})
export class OopsModule {}
