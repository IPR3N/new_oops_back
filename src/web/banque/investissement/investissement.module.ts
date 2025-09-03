import { Module } from '@nestjs/common';
import { InvestissementService } from './investissement.service';
import { InvestissementController } from './investissement.controller';

@Module({
  controllers: [InvestissementController],
  providers: [InvestissementService],
})
export class InvestissementModule {}
