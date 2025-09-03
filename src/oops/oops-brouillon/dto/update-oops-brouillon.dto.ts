import { PartialType } from '@nestjs/mapped-types';
import { CreateOopsBrouillonDto } from './create-oops-brouillon.dto';

export class UpdateOopsBrouillonDto extends PartialType(CreateOopsBrouillonDto) {}
