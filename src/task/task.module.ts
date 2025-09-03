import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Project,
      ProjectMemberShip
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
