import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { Partenaire } from './entities/partenaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartenaireProfile } from '../partenaire-profile/entities/partenaire-profile.entity';

@Injectable()
export class PartenaireService {
  constructor(
    @InjectRepository(Partenaire)
    private readonly partenaireRepository: Repository<Partenaire>,
    @InjectRepository(PartenaireProfile)
    private readonly profileRepository: Repository<PartenaireProfile>,
  ) {}

  async create(createPartenaireDto: CreatePartenaireDto): Promise<Partenaire> {
    const { nom, email, telephone, adresse, password, site_web, profileId } =
      createPartenaireDto;

    // Vérifier si le profil existe
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profil avec l'ID ${profileId} non trouvé`);
    }

    // Créer un nouveau partenaire
    const partenaire = this.partenaireRepository.create({
      nom,
      email,
      telephone,
      adresse,
      password,
      site_web,
      profile,
    });

    return this.partenaireRepository.save(partenaire);
  }

  async findAll(): Promise<Partenaire[]> {
    return this.partenaireRepository.find({ relations: ['profile'] });
  }

  async findOne(id: number): Promise<Partenaire> {
    const partenaire = await this.partenaireRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!partenaire) {
      throw new NotFoundException(`Partenaire avec l'ID ${id} non trouvé`);
    }
    return partenaire;
  }

  async update(
    id: number,
    updatePartenaireDto: UpdatePartenaireDto,
  ): Promise<Partenaire> {
    const { nom, email, telephone, adresse, site_web, profileId } =
      updatePartenaireDto;

    // Vérifier si le partenaire existe
    const partenaire = await this.findOne(id);

    // Mettre à jour les champs si fournis
    if (nom) partenaire.nom = nom;
    // if (type_partenaire) partenaire.type_partenaire = type_partenaire;
    if (email) partenaire.email = email;
    if (telephone) partenaire.telephone = telephone;
    if (adresse) partenaire.adresse = adresse;
    if (site_web) partenaire.site_web = site_web;
    if (profileId) {
      const profile = await this.profileRepository.findOne({
        where: { id: profileId },
      });
      if (!profile) {
        throw new NotFoundException(`Profil avec l'ID ${profileId} non trouvé`);
      }
      partenaire.profile = profile;
    }

    return this.partenaireRepository.save(partenaire);
  }

  async remove(id: number): Promise<void> {
    const partenaire = await this.findOne(id);
    await this.partenaireRepository.remove(partenaire);
  }
}
