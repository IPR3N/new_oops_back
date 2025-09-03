import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async findAll(): Promise<Region[]> {
    return this.regionRepository.find();
  }

  async createRegion(data: {
    nom: string;
    description: string;
    pays: string;
    code: string;
    superficie: number;
    population: number;
    climat: string;
    biodiversite: string;
    environnement: string;
  }) {
    const region = this.regionRepository.create(data);
    return this.regionRepository.save(region);
  }

  async updateRegion(
    id: number,
    data: {
      nom: string;
      description: string;
      pays: string;
      code: string;
      superficie: number;
      population: number;
      climat: string;
      biodiversite: string;
      environnement: string;
    },
  ) {
    const region = await this.regionRepository.findOne({ where: { id } });
    if (!region) {
      throw new Error('Région non trouvée');
    }
    Object.assign(region, data);
    return this.regionRepository.save(region);
  }

  async deleteRegion(id: number) {
    const region = await this.regionRepository.findOne({ where: { id } });
    if (!region) {
      throw new Error('Région non trouvée');
    }
    await this.regionRepository.delete(id);
    return { message: 'Région supprimée' };
  }
}
