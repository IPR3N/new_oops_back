import { PartialType } from '@nestjs/mapped-types';
import { CreateBrouillonDto } from './create-brouillon.dto';

export class UpdateBrouillonDto extends PartialType(CreateBrouillonDto) {}
