import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Project } from 'src/project/entities/project.entity';
import { CropVariety } from 'src/crop_variety/entities/crop_variety.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Crop,
      Project,
      CropVariety
    ])
  ],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule { }
