import { Injectable } from '@nestjs/common';
import { CreateInvestissementDto } from './dto/create-investissement.dto';
import { UpdateInvestissementDto } from './dto/update-investissement.dto';

@Injectable()
export class InvestissementService {
  create(createInvestissementDto: CreateInvestissementDto) {
    return 'This action adds a new investissement';
  }

  findAll() {
    return `This action returns all investissement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} investissement`;
  }

  update(id: number, updateInvestissementDto: UpdateInvestissementDto) {
    return `This action updates a #${id} investissement`;
  }

  remove(id: number) {
    return `This action removes a #${id} investissement`;
  }
}
