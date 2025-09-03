import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOngProjetDto } from './dto/create-ong-projet.dto';
import { UpdateOngProjetDto } from './dto/update-ong-projet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OngProjet } from './entities/ong-projet.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Region } from 'src/region/entities/region.entity';
import { Partenaire } from '../partenaire/entities/partenaire.entity';

@Injectable()
export class OngProjetService {
  constructor(
    @InjectRepository(OngProjet)
    private readonly ongProjetRepository: Repository<OngProjet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Region)
    private regionRepository: Repository<Region>,

    @InjectRepository(Partenaire)
    private partenaireRepository: Repository<Partenaire>,
  ) {}

  findAllByPartenairId(partenaire: number): Promise<OngProjet[]> {
    return this.ongProjetRepository.find({
      where: { partenaire: { id: partenaire } },
      relations: ['beneficiaires'],
    });
  }

  async create(createOngProjetDto: CreateOngProjetDto): Promise<OngProjet> {
    const {
      nom,
      description,
      beneficiaireIds,
      partenaireId,
      regionId,
      dateDebut,
      dateFinPrevue,
    } = createOngProjetDto;

    // Vérifier le partenaire
    const partenaire = await this.partenaireRepository.findOne({
      where: { id: partenaireId },
    });
    if (!partenaire) {
      throw new NotFoundException(
        `Partenaire avec l'ID ${partenaireId} non trouvé`,
      );
    }

    // Vérifier la région
    const region = await this.regionRepository.findOne({
      where: { id: regionId },
    });
    if (!region) {
      throw new NotFoundException(`Région avec l'ID ${regionId} non trouvée`);
    }

    // Vérifier les bénéficiaires (si fournis)
    let beneficiaires: User[] = [];
    if (beneficiaireIds && beneficiaireIds.length > 0) {
      beneficiaires = await this.userRepository.find({
        where: { id: In(beneficiaireIds) },
      });
      if (beneficiaires.length !== beneficiaireIds.length) {
        throw new NotFoundException(
          "Certains utilisateurs spécifiés n'existent pas",
        );
      }
    }

    // Créer le projet
    const projet = this.ongProjetRepository.create({
      nom,
      description,
      partenaire,
      region,
      beneficiaires,
      dateDebut,
      dateFinPrevue,
    });

    return this.ongProjetRepository.save(projet);
  }
  async update(
    id: number,
    updateOngProjetDto: UpdateOngProjetDto,
  ): Promise<OngProjet> {
    const { nom, description, partenaireId, beneficiaireIds } =
      updateOngProjetDto;

    // Vérifier si le projet existe
    const projet = await this.findOne(id);

    // Mettre à jour les champs si fournis
    if (nom) {
      projet.nom = nom;
    }
    if (description) {
      projet.description = description;
    }

    if (partenaireId) {
      projet.partenaire = partenaireId as any;
    }
    // Me

    // Mettre à jour les bénéficiaires si fournis

    if (beneficiaireIds) {
      const beneficiaires = await this.userRepository.find({
        where: { id: In(beneficiaireIds) },
      });
      if (beneficiaires.length !== beneficiaireIds.length) {
        throw new NotFoundException(
          "Certains utilisateurs spécifiés n'existent pas",
        );
      }
      projet.beneficiaires = beneficiaires;
    }

    return this.ongProjetRepository.save(projet);
  }

  // async remove(id: number): Promise<void> {
  //   const projet = await this.findOne(id);
  //   await this.ongProjetRepository.remove(projet);
  // }

  async addBeneficiaires(
    projetId: number,
    beneficiaireIds: number[],
  ): Promise<OngProjet> {
    // Vérifier si le projet existe
    const projet = await this.findOne(projetId);

    // Vérifier si les utilisateurs existent
    const newBeneficiaires = await this.userRepository.find({
      where: { id: In(beneficiaireIds) },
    });
    if (newBeneficiaires.length !== beneficiaireIds.length) {
      throw new NotFoundException(
        "Certains utilisateurs spécifiés n'existent pas",
      );
    }

    // Ajouter les nouveaux bénéficiaires à la liste existante (en évitant les doublons)
    const existingBeneficiaires = projet.beneficiaires || [];
    const updatedBeneficiaires = [
      ...existingBeneficiaires,
      ...newBeneficiaires.filter(
        (newBeneficiaire) =>
          !existingBeneficiaires.some(
            (existing) => existing.id === newBeneficiaire.id,
          ),
      ),
    ];
    projet.beneficiaires = updatedBeneficiaires;

    // Sauvegarder le projet mis à jour
    return this.ongProjetRepository.save(projet);
  }

  async findAll(): Promise<OngProjet[]> {
    return this.ongProjetRepository.find({
      relations: ['beneficiaires', 'partenaire', 'region'],
    });
  }

  async findByPartenaire(partenaireId: number): Promise<OngProjet[]> {
    return this.ongProjetRepository.find({
      where: { partenaire: { id: partenaireId } },
      relations: {
        region: true,
        beneficiaires: true,
        partenaire: true,
      },
    });
  }

  async findOne(id: number): Promise<OngProjet> {
    const projet = await this.ongProjetRepository.findOne({
      where: { id },
      relations: ['beneficiaires', 'partenaire', 'region'],
    });
    if (!projet) {
      throw new NotFoundException(`Projet avec l'ID ${id} non trouvé`);
    }
    return projet;
  }

  // async update(
  //   id: number,
  //   updateOngProjetDto: CreateOngProjetDto,
  // ): Promise<OngProjet> {
  //   const projet = await this.findOne(id);

  //   const {
  //     nom,
  //     description,
  //     beneficiaireIds,
  //     partenaireId,
  //     regionId,
  //     dateDebut,
  //     dateFinPrevue,
  //   } = updateOngProjetDto;

  //   if (nom) projet.nom = nom;
  //   if (description) projet.description = description;
  //   if (dateDebut) projet.dateDebut = dateDebut;
  //   if (dateFinPrevue) projet.dateFinPrevue = dateFinPrevue;

  //   if (partenaireId) {
  //     const partenaire = await this.on.findOne({
  //       where: { id: partenaireId },
  //     });
  //     if (!partenaire) {
  //       throw new NotFoundException(
  //         `Partenaire avec l'ID ${partenaireId} non trouvé`,
  //       );
  //     }
  //     projet.partenaire = partenaire;
  //   }

  //   if (regionId) {
  //     const region = await this.regionRepository.findOne({
  //       where: { id: regionId },
  //     });
  //     if (!region) {
  //       throw new NotFoundException(`Région avec l'ID ${regionId} non trouvée`);
  //     }
  //     projet.region = region;
  //   }

  //   if (beneficiaireIds) {
  //     projet.beneficiaires =
  //       await this.userRepository.findByIds(beneficiaireIds);
  //   }

  //   return this.ongProjetRepository.save(projet);
  // }

  async remove(id: number): Promise<void> {
    const projet = await this.findOne(id);
    await this.ongProjetRepository.remove(projet);
  }
}
