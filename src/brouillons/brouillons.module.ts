import { Module } from '@nestjs/common';
import { BrouillonsService } from './brouillons.service';
import { BrouillonsController } from './brouillons.controller';

@Module({
  controllers: [BrouillonsController],
  providers: [BrouillonsService],
})
export class BrouillonsModule {}
