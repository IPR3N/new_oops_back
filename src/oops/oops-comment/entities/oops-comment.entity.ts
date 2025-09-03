import { Oops } from 'src/oops/entities/oop.entity';
import { OopsLike } from 'src/oops/oops-like/entities/oops-like.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OopsComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.oopsComments, { eager: true })
  user: User;

  @ManyToOne(() => Oops, (oops) => oops.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  oops?: Oops;

  @ManyToOne(() => OopsComment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentComment?: OopsComment;

  @OneToMany(() => OopsComment, (comment) => comment.parentComment)
  replies: OopsComment[];

  @OneToMany(() => OopsLike, (like) => like.comment)
  likes: OopsLike[];

  @CreateDateColumn()
  createdAt: Date;
}
