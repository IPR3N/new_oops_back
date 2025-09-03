import { Crop } from 'src/crop/entities/crop.entity';
import { CropVariety } from 'src/crop_variety/entities/crop_variety.entity';
import { Marketplace } from 'src/marketplace/entities/marketplace.entity';
import { ProjectMedia } from 'src/project-media/entities/project-media.entity';

import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { ProjectMessage } from 'src/project_messages/entities/project_message.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  description: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @ManyToOne(() => User, (user) => user.createdProjects)
  owner: User;

  @OneToMany(() => ProjectMemberShip, (membership) => membership.project, {
    cascade: true,
  })
  memberships: ProjectMemberShip[];

  @ManyToOne(() => Crop, (crop) => crop.projects, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  crop: Crop;

  @ManyToOne(() => CropVariety, (crop) => crop.projects, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  cropVariety: CropVariety;

  @OneToOne(() => Marketplace, (marketplace) => marketplace.projectId, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  marketplace: Marketplace;

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];

  @OneToMany(() => ProjectMedia, (projectMedia) => projectMedia.project)
  projectMedia: ProjectMedia[];

  @OneToMany(() => ProjectMessage, (message) => message.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  messages: ProjectMessage[];

  @Column({ type: 'boolean', default: false })
  is_listed_on_marketplace: boolean;

  @Column({
    nullable: true,
  })
  image_url: string;

  @Column({
    nullable: true,
  })
  estimated_quantity_produced: string;

  @Column({
    nullable: true,
  })
  base_price: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
