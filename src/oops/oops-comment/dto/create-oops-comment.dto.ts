export class CreateOopsCommentDto {
  content: string;
  user: number;
  oops?: number;
  parentComment?: number;
}
