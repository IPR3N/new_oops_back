import { Injectable } from '@nestjs/common';
import { CreateCropVarietyDto } from './dto/create-crop_variety.dto';
import { UpdateCropVarietyDto } from './dto/update-crop_variety.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CropVariety } from './entities/crop_variety.entity';
import { Repository } from 'typeorm';
import { Crop } from 'src/crop/entities/crop.entity';

@Injectable()
export class CropVarietyService {


  constructor(
    @InjectRepository(CropVariety)
    private readonly cropVarietyRepository: Repository<CropVariety>,


    @InjectRepository(Crop) private readonly cropRepository: Repository<Crop>
  ) { }

  async create(createCropVarietyDto: CreateCropVarietyDto) {
    const crop = await this.cropRepository.findOne({ where: { id: createCropVarietyDto.crop } });
    if (!crop) {
      throw new Error('Crop not found');
    }

    createCropVarietyDto.created_at = new Date();
    createCropVarietyDto.updated_at = new Date()

    // console.log(crop, createCropVarietyDto);
    // return
    const cropVariety = this.cropVarietyRepository.create({
      ...createCropVarietyDto,
      crop,
    });

    return this.cropVarietyRepository.save(cropVariety);;
  }

  findAll() {
    const cropVariety = this.cropVarietyRepository.find({
      relations: {
        crop: true
      }
    })

    return cropVariety;
  }

  findOne(id: number) {
    return this.cropVarietyRepository.findOne({
      where: {
        id: id
      },
      relations: {
        crop: true
      }
    });
  }

  async update(id: number, updateCropVarietyDto: UpdateCropVarietyDto) {
    // Transform crop ID to match the expected type
    const updatedDto = {
      ...updateCropVarietyDto,
      crop: { id: updateCropVarietyDto.crop }, // Transform crop to object
    };

    return this.cropVarietyRepository.update(id, updatedDto);
  }

  // update(id: number, updateCropVarietyDto: UpdateCropVarietyDto) {
  //   return this.cropVarietyRepository.update(id, updateCropVarietyDto);
  // }

  remove(id: number) {
    return this.cropVarietyRepository.delete(id);
  }
}
