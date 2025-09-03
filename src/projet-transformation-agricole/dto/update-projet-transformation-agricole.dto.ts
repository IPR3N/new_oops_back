import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetTransformationAgricoleDto } from './create-projet-transformation-agricole.dto';

export class UpdateProjetTransformationAgricoleDto extends PartialType(CreateProjetTransformationAgricoleDto) {}
