import { PartialType } from '@nestjs/mapped-types';
import { CreateOopsCommentDto } from './create-oops-comment.dto';

export class UpdateOopsCommentDto extends PartialType(CreateOopsCommentDto) {}
