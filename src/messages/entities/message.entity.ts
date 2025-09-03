import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column('integer')
  senderId: number;

  @Column('integer')
  receiverId: number;

  @ManyToOne(() => User, { nullable: false })
  sender: User;

  @ManyToOne(() => User, { nullable: false })
  receiver: User;

  @CreateDateColumn()
  createdAt: Date;
}
