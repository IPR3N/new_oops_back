import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Frienship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentRequests)
  requester: User;

  @ManyToOne(() => User, (user) => user.receivedRequests)
  receiver: User;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  })
  status: 'pending' | 'accepted' | 'declined';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
