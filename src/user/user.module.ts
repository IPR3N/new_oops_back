import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { Oops } from 'src/oops/entities/oop.entity';
import { OopsComment } from 'src/oops/oops-comment/entities/oops-comment.entity';
import { OopsLike } from 'src/oops/oops-like/entities/oops-like.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Frienship } from 'src/frienship/entities/frienship.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { OngProjet } from 'src/web/ong-projet/entities/ong-projet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Project,
      ProjectMemberShip,
      Oops,
      OopsComment,
      OopsLike,
      Profile,
      Frienship,
      Notification,
      OngProjet,
    ]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
