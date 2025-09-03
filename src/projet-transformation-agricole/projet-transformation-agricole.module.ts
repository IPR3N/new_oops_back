import { Module } from '@nestjs/common';
import { ProjetTransformationAgricoleService } from './projet-transformation-agricole.service';
import { ProjetTransformationAgricoleController } from './projet-transformation-agricole.controller';

@Module({
  controllers: [ProjetTransformationAgricoleController],
  providers: [ProjetTransformationAgricoleService],
})
export class ProjetTransformationAgricoleModule {}
