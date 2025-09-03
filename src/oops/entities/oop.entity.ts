import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Like,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OopsComment } from '../oops-comment/entities/oops-comment.entity';
import { OopsLike } from '../oops-like/entities/oops-like.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Oops {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.oops, { eager: true })
  user: User;

  @OneToMany(() => OopsComment, (comment) => comment.oops)
  comments: OopsComment[];

  @OneToMany(() => OopsLike, (oopsLike) => oopsLike.oops)
  likes: OopsLike[];

  @ManyToOne(() => Oops, (oops) => oops.sharedPosts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  sharedFrom?: Oops; // Post d'origine si c'est un partage

  @OneToMany(() => Oops, (oops) => oops.sharedFrom)
  sharedPosts: Oops[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  get commentsCount(): number {
    return this.comments.length ?? 0;
  }

  @Expose()
  get likesCount(): number {
    return this.likes.length ?? 0;
  }

  @Expose()
  get sharesCount(): number {
    return this.sharedPosts.length ?? 0;
  }
}
