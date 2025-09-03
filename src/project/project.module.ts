import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from 'src/crop/entities/crop.entity';
import { CropVariety } from 'src/crop_variety/entities/crop_variety.entity';
import { Task } from 'src/task/entities/task.entity';
import { ProjectMedia } from 'src/project-media/entities/project-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      User,
      ProjectMemberShip,
      Crop,
      CropVariety,
      Task,
      ProjectMedia,
    ]),
  ],

  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
