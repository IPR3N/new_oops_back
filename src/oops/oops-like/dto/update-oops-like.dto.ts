import { PartialType } from '@nestjs/mapped-types';
import { CreateOopsLikeDto } from './create-oops-like.dto';

export class UpdateOopsLikeDto extends PartialType(CreateOopsLikeDto) {}
