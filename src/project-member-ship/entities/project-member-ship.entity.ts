import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectMemberShip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.memberships)
  user: User;

  @ManyToOne(() => Project, (project) => project.memberships, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column({ default: 'collaborator' })
  role: string;

  @OneToMany(() => Task, (task) => task.taskOwner, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
