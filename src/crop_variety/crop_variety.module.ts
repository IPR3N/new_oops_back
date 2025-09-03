import { Module } from '@nestjs/common';
import { CropVarietyService } from './crop_variety.service';
import { CropVarietyController } from './crop_variety.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropVariety } from './entities/crop_variety.entity';
import { Crop } from 'src/crop/entities/crop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CropVariety, Crop]),
  ],
  controllers: [CropVarietyController],
  providers: [CropVarietyService],
})
export class CropVarietyModule { }
