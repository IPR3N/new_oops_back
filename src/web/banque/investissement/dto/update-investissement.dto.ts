import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestissementDto } from './create-investissement.dto';

export class UpdateInvestissementDto extends PartialType(CreateInvestissementDto) {}
