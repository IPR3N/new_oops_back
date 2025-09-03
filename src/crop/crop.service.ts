import { Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CropService {

  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) { }

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const crop = this.cropRepository.create(createCropDto);
    return await this.cropRepository.save(crop);
  }


  findAll() {
    return this.cropRepository.find({
      relations: {
        cropVariety: true,
      }
    });
  }

  findOne(id: number) {
    return this.cropRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateCropDto: UpdateCropDto) {
    return this.cropRepository.update(id, updateCropDto);
  }

  remove(id: number) {
    return this.cropRepository.delete(id);
  }
}
