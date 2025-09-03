import { Module } from '@nestjs/common';
import { OngProjetService } from './ong-projet.service';
import { OngProjetController } from './ong-projet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngProjet } from './entities/ong-projet.entity';
import { User } from 'src/user/entities/user.entity';
import { Partenaire } from '../partenaire/entities/partenaire.entity';
import { ProjetRapportModule } from './projet-rapport/projet-rapport.module';
import { Region } from 'src/region/entities/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OngProjet, User, Partenaire, Region]),
    ProjetRapportModule,
  ],
  controllers: [OngProjetController],
  providers: [OngProjetService],
})
export class OngProjetModule {}
