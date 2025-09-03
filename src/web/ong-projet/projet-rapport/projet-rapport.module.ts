import { Module } from '@nestjs/common';
import { ProjetRapportService } from './projet-rapport.service';
import { ProjetRapportController } from './projet-rapport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetRapport } from './entities/projet-rapport.entity';
import { OngProjet } from '../entities/ong-projet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjetRapport, OngProjet])],
  controllers: [ProjetRapportController],
  providers: [ProjetRapportService],
})
export class ProjetRapportModule {}
