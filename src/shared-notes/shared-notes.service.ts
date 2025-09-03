import { Injectable } from '@nestjs/common';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';
import { UpdateSharedNoteDto } from './dto/update-shared-note.dto';

@Injectable()
export class SharedNotesService {
  create(createSharedNoteDto: CreateSharedNoteDto) {
    return 'This action adds a new sharedNote';
  }

  findAll() {
    return `This action returns all sharedNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedNote`;
  }

  update(id: number, updateSharedNoteDto: UpdateSharedNoteDto) {
    return `This action updates a #${id} sharedNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedNote`;
  }
}
