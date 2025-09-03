import { Injectable } from '@nestjs/common';
import { CreateBrouillonDto } from './dto/create-brouillon.dto';
import { UpdateBrouillonDto } from './dto/update-brouillon.dto';

@Injectable()
export class BrouillonsService {
  create(createBrouillonDto: CreateBrouillonDto) {
    return 'This action adds a new brouillon';
  }

  findAll() {
    return `This action returns all brouillons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brouillon`;
  }

  update(id: number, updateBrouillonDto: UpdateBrouillonDto) {
    return `This action updates a #${id} brouillon`;
  }

  remove(id: number) {
    return `This action removes a #${id} brouillon`;
  }
}
