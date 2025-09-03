import { Module } from '@nestjs/common';
import { ProjectMediaService } from './project-media.service';
import { ProjectMediaController } from './project-media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMedia } from './entities/project-media.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMedia, Project])],
  controllers: [ProjectMediaController],
  providers: [ProjectMediaService],
})
export class ProjectMediaModule {}
