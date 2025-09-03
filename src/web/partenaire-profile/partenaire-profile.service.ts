import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartenaireProfileDto } from './dto/create-partenaire-profile.dto';
import { UpdatePartenaireProfileDto } from './dto/update-partenaire-profile.dto';
import { PartenaireProfile } from './entities/partenaire-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartenaireProfileService {
  constructor(
    @InjectRepository(PartenaireProfile)
    private readonly profileRepository: Repository<PartenaireProfile>,
  ) {}

  async create(
    createPartenaireProfileDto: CreatePartenaireProfileDto,
  ): Promise<PartenaireProfile> {
    const { nom, bio } = createPartenaireProfileDto;

    // Créer un nouveau profil
    const profile = this.profileRepository.create({ nom, bio });

    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<PartenaireProfile[]> {
    return this.profileRepository.find({ relations: ['partenaires'] });
  }

  async findOne(id: number): Promise<PartenaireProfile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['partenaires'],
    });
    if (!profile) {
      throw new NotFoundException(`Profil avec l'ID ${id} non trouvé`);
    }
    return profile;
  }

  async update(
    id: number,
    updatePartenaireProfileDto: UpdatePartenaireProfileDto,
  ): Promise<PartenaireProfile> {
    const { bio } = updatePartenaireProfileDto;

    // Vérifier si le profil existe
    const profile = await this.findOne(id);

    // Mettre à jour le champ bio si fourni
    if (bio) {
      profile.bio = bio;
    }

    return this.profileRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);

    // Vérifier si le profil est utilisé par des partenaires
    if (profile.partenaires && profile.partenaires.length > 0) {
      throw new NotFoundException(
        `Impossible de supprimer le profil avec l'ID ${id}, car il est associé à ${profile.partenaires.length} partenaire(s)`,
      );
    }

    await this.profileRepository.remove(profile);
  }
}
