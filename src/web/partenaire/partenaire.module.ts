import { Module } from '@nestjs/common';
import { PartenaireService } from './partenaire.service';
import { PartenaireController } from './partenaire.controller';
import { Partenaire } from './entities/partenaire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartenaireProfile } from '../partenaire-profile/entities/partenaire-profile.entity';
import { OngProjet } from '../ong-projet/entities/ong-projet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partenaire, PartenaireProfile, OngProjet]),
  ],
  controllers: [PartenaireController],
  providers: [PartenaireService],
})
export class PartenaireModule {}
