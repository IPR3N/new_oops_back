import { Module } from '@nestjs/common';
import { ProjectMemberShipService } from './project-member-ship.service';
import { ProjectMemberShipController } from './project-member-ship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMemberShip } from './entities/project-member-ship.entity';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectMemberShip,
      User,
      Project,
      Task
    ])
  ],
  controllers: [ProjectMemberShipController],
  providers: [ProjectMemberShipService],
})
export class ProjectMemberShipModule { }
