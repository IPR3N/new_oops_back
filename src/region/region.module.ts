import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { OngProjet } from 'src/web/ong-projet/entities/ong-projet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, OngProjet])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
