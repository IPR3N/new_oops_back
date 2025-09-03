import { PartialType } from '@nestjs/mapped-types';
import { CreateOopDto } from './create-oop.dto';

export class UpdateOopDto extends PartialType(CreateOopDto) {}
