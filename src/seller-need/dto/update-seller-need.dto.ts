import { PartialType } from '@nestjs/swagger';
import { CreateSellerNeedDto } from './create-seller-need.dto';

export class UpdateSellerNeedDto extends PartialType(CreateSellerNeedDto) {}
