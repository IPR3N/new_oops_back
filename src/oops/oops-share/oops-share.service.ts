import { Injectable } from '@nestjs/common';
import { CreateOopsShareDto } from './dto/create-oops-share.dto';
import { UpdateOopsShareDto } from './dto/update-oops-share.dto';

@Injectable()
export class OopsShareService {
  create(createOopsShareDto: CreateOopsShareDto) {
    return 'This action adds a new oopsShare';
  }

  findAll() {
    return `This action returns all oopsShare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oopsShare`;
  }

  update(id: number, updateOopsShareDto: UpdateOopsShareDto) {
    return `This action updates a #${id} oopsShare`;
  }

  remove(id: number) {
    return `This action removes a #${id} oopsShare`;
  }
}
