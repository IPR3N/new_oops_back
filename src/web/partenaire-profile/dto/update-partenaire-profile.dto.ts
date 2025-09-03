import { PartialType } from '@nestjs/mapped-types';
import { CreatePartenaireProfileDto } from './create-partenaire-profile.dto';

export class UpdatePartenaireProfileDto extends PartialType(CreatePartenaireProfileDto) {}
