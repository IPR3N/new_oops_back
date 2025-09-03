import { Injectable } from '@nestjs/common';
import { CreateProjetRapportDto } from './dto/create-projet-rapport.dto';
import { UpdateProjetRapportDto } from './dto/update-projet-rapport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjetRapport } from './entities/projet-rapport.entity';
import { Repository } from 'typeorm';
import { OngProjet } from '../entities/ong-projet.entity';

@Injectable()
export class ProjetRapportService {
  constructor(
    @InjectRepository(ProjetRapport)
    private rapportRepository: Repository<ProjetRapport>,
    @InjectRepository(OngProjet)
    private ongProjetRepository: Repository<OngProjet>,
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
  ) {}
  async createRapport(
    projetId: number,
    titre: string,
    contenu: string,
  ): Promise<ProjetRapport> {
    const projet = await this.ongProjetRepository.findOne({
      where: { id: projetId },
    });
    if (!projet) {
      throw new Error('Projet non trouvé');
    }

    // const admin = await this.userRepository.findOne({ where: { id: adminId } });
    // if (!admin) {
    //   throw new Error('Administrateur non trouvé');
    // }

    const rapport = this.rapportRepository.create({
      titre,
      contenu,
      projet,
      // admin,
    });

    return this.rapportRepository.save(rapport);
  }

  async getRapportsByProjet(projetId: number): Promise<ProjetRapport[]> {
    return this.rapportRepository.find({
      where: { projet: { id: projetId } },
      // relations: ['admin'],
      order: { createdAt: 'DESC' },
    });
  }
  //by projeCt ong iD
  async findByPartenaire(partenaireId: any): Promise<any[]> {
    return this.rapportRepository.find({
      where: {
        projet: {
          partenaire: partenaireId,
        },
      },
      relations: ['projet'],
    });
  }
}
