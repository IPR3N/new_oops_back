import { Injectable } from '@nestjs/common';
import { CreateProjectMessageDto } from './dto/create-project_message.dto';
import { UpdateProjectMessageDto } from './dto/update-project_message.dto';

@Injectable()
export class ProjectMessagesService {
  create(createProjectMessageDto: CreateProjectMessageDto) {
    return 'This action adds a new projectMessage';
  }

  findAll() {
    return `This action returns all projectMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectMessage`;
  }

  update(id: number, updateProjectMessageDto: UpdateProjectMessageDto) {
    return `This action updates a #${id} projectMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectMessage`;
  }
}
