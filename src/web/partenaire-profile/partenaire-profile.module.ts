import { Module } from '@nestjs/common';
import { PartenaireProfileService } from './partenaire-profile.service';
import { PartenaireProfileController } from './partenaire-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartenaireProfile } from './entities/partenaire-profile.entity';
import { Partenaire } from '../partenaire/entities/partenaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartenaireProfile, Partenaire])],
  controllers: [PartenaireProfileController],
  providers: [PartenaireProfileService],
})
export class PartenaireProfileModule {}
