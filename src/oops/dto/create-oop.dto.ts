import { User } from 'src/user/entities/user.entity';
import { OopsComment } from '../oops-comment/entities/oops-comment.entity';
import { OopsLike } from '../oops-like/entities/oops-like.entity';

export class CreateOopDto {
  id: number;
  user: number;
  content: string;
  image?: string;
  comments: OopsComment[];
  likes: OopsLike;
  sharedFrom?: number;
  createdAt: Date;
  updatedAt: Date;
}
