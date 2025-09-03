import { Injectable } from '@nestjs/common';
import { CreateSellerNeedDto } from './dto/create-seller-need.dto';
import { UpdateSellerNeedDto } from './dto/update-seller-need.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerNeed } from './entities/seller-need.entity';
import { Repository } from 'typeorm';
import { Crop } from 'src/crop/entities/crop.entity';

@Injectable()
export class SellerNeedService {
  constructor(
    @InjectRepository(SellerNeed)
    private readonly sellerNeedRepository: Repository<SellerNeed>,

    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
  ) {}

  async create(createSellerNeedDto: CreateSellerNeedDto) {
    const crop = await this.cropRepository.findOneBy({
      id: createSellerNeedDto.produictId,
    });
    if (!crop) {
      throw new Error('Crop not found');
    }

    const sellerNeed = this.sellerNeedRepository.create({
      quantity: createSellerNeedDto.quantity,
      crop: crop,
    });

    return this.sellerNeedRepository.save(sellerNeed);
  }

  findAll() {
    return this.sellerNeedRepository.find();
  }

  findOne(id: number) {
    return this.sellerNeedRepository.findOne({
      where: { id },
      relations: ['crop'],
    });
  }

  async update(id: number, updateDto: UpdateSellerNeedDto) {
    await this.sellerNeedRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.sellerNeedRepository.delete(id);
    return { message: `SellerNeed #${id} deleted` };
  }
}
