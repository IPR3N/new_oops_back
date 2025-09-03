import { PartialType } from '@nestjs/mapped-types';
import { CreateOopsShareDto } from './create-oops-share.dto';

export class UpdateOopsShareDto extends PartialType(CreateOopsShareDto) {}
