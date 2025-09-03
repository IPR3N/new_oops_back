import { Oops } from 'src/oops/entities/oop.entity';
import { OopsComment } from 'src/oops/oops-comment/entities/oops-comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OopsLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likedOops, { eager: true })
  user: User;

  @ManyToOne(() => Oops, (oops) => oops.likes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  oops?: Oops;

  @ManyToOne(() => OopsComment, (comment) => comment.likes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  comment?: OopsComment;
}
