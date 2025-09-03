import { PartialType } from '@nestjs/mapped-types';
import { CreateOngProjetDto } from './create-ong-projet.dto';

export class UpdateOngProjetDto extends PartialType(CreateOngProjetDto) {}
