import { PartialType } from '@nestjs/mapped-types';
import { CreateCropVarietyDto } from './create-crop_variety.dto';

export class UpdateCropVarietyDto extends PartialType(CreateCropVarietyDto) {}
