import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  fileType: string;

  @ManyToOne(() => Project, (project) => project.messages)
  project: Project;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @CreateDateColumn()
  created_at: Date;
}
