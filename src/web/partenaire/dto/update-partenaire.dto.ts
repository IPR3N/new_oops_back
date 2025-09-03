import { PartialType } from '@nestjs/mapped-types';
import { CreatePartenaireDto } from './create-partenaire.dto';

export class UpdatePartenaireDto extends PartialType(CreatePartenaireDto) {}
