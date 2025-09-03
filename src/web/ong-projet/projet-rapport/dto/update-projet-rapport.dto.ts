import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetRapportDto } from './create-projet-rapport.dto';

export class UpdateProjetRapportDto extends PartialType(CreateProjetRapportDto) {}
