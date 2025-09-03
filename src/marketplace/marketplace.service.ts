import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';
import { Marketplace } from './entities/marketplace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class MarketplaceService {

  constructor(
    @InjectRepository(Marketplace) private readonly marketPlaceRepository: Repository<Marketplace>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) { }


  async create(createMarketplaceDto: CreateMarketplaceDto) {
    const projetct = await this.projectRepository.findOne({
      where: {
        id: createMarketplaceDto.projectId,
      },
    });
    if (!projetct) {
      throw new NotFoundException('Projet introuvable');
    }

    const existingEntry = await this.marketPlaceRepository.findOne({
      where: {
        projectId: projetct,
      },
    });

    if (existingEntry) {
      throw new ConflictException('Le projet est déjà publié sur la marketplace');
    }


    const newMarketPlaceEntry = this.marketPlaceRepository.create({
      projectId: projetct,
    });

    const savedEntry = await this.marketPlaceRepository.save(newMarketPlaceEntry);
    projetct.is_listed_on_marketplace = true;
    await this.projectRepository.save(projetct);

    return savedEntry;
  }
  // async create(createMarketplaceDto: CreateMarketplaceDto) {
  //   const projetct = await this.projectRepository.findOne({
  //     where: {
  //       id:
  //         createMarketplaceDto.projectId
  //     }
  //   })
  //   if (!projetct) {
  //     throw new NotFoundException('Projet introuvable');
  //   }

  //   const existingEntry = await this.marketPlaceRepository.findOne({
  //     where: {
  //       projectId: projetct
  //     }
  //   })

  //   if (existingEntry) {
  //     throw new ConflictException('Le projet est déjà publié sur la marketplace');
  //   }

  //   const newMarketPlaceEntry = this.marketPlaceRepository.create({
  //     projectId: projetct,
  //     public_description: createMarketplaceDto.public_description,
  //     // estimated_quantity: createMarketplaceDto.estimated_quantity
  //   })
  //   return await this.marketPlaceRepository.save(newMarketPlaceEntry);
  // }

  findAll() {
    return this.marketPlaceRepository.find({
      relations: [
        'projectId',
        'projectId.owner'
      ]
    });
  }

  findAllByUser(userId: number) {
    return this.marketPlaceRepository.find({
      where: {
        projectId: {
          owner: { id: userId }
        }
      },
      relations: [
        'projectId',
        'projectId.owner'
      ]
    });
  }

  findOne(id: number) {
    return this.marketPlaceRepository.findOne({
      where: { id: id },
      relations: {
        projectId: true
      }
    });
  }

  update(id: number, updateMarketplaceDto: UpdateMarketplaceDto) {
    const updateData = {
      ...updateMarketplaceDto,
      projectId: { id: updateMarketplaceDto.projectId }
    };
    return this.marketPlaceRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.marketPlaceRepository.delete(id);
  }
}
