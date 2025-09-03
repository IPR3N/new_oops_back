import { PartialType } from '@nestjs/mapped-types';
import { CreateSharedNoteDto } from './create-shared-note.dto';

export class UpdateSharedNoteDto extends PartialType(CreateSharedNoteDto) {}
