import { Injectable } from '@nestjs/common';
import { CreateOopsBrouillonDto } from './dto/create-oops-brouillon.dto';
import { UpdateOopsBrouillonDto } from './dto/update-oops-brouillon.dto';

@Injectable()
export class OopsBrouillonService {
  create(createOopsBrouillonDto: CreateOopsBrouillonDto) {
    return 'This action adds a new oopsBrouillon';
  }

  findAll() {
    return `This action returns all oopsBrouillon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oopsBrouillon`;
  }

  update(id: number, updateOopsBrouillonDto: UpdateOopsBrouillonDto) {
    return `This action updates a #${id} oopsBrouillon`;
  }

  remove(id: number) {
    return `This action removes a #${id} oopsBrouillon`;
  }
}
