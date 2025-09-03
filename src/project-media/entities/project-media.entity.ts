import { Project } from 'src/project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProjectMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img: string;

  @ManyToOne(() => Project, (project) => project.projectMedia)
  project: Project;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
