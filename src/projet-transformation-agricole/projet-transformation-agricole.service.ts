import { Injectable } from '@nestjs/common';
import { CreateProjetTransformationAgricoleDto } from './dto/create-projet-transformation-agricole.dto';
import { UpdateProjetTransformationAgricoleDto } from './dto/update-projet-transformation-agricole.dto';

@Injectable()
export class ProjetTransformationAgricoleService {
  create(createProjetTransformationAgricoleDto: CreateProjetTransformationAgricoleDto) {
    return 'This action adds a new projetTransformationAgricole';
  }

  findAll() {
    return `This action returns all projetTransformationAgricole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projetTransformationAgricole`;
  }

  update(id: number, updateProjetTransformationAgricoleDto: UpdateProjetTransformationAgricoleDto) {
    return `This action updates a #${id} projetTransformationAgricole`;
  }

  remove(id: number) {
    return `This action removes a #${id} projetTransformationAgricole`;
  }
}
