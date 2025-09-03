import { Module } from '@nestjs/common';
import { ProjectMessagesService } from './project_messages.service';
import { ProjectMessagesController } from './project_messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMessage } from './entities/project_message.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectMessage,
      Project,
      User,
      ProjectMemberShip,
    ]),
  ],
  controllers: [ProjectMessagesController],
  providers: [ProjectMessagesService],
})
export class ProjectMessagesModule {}
