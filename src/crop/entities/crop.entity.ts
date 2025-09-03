import { CropVariety } from 'src/crop_variety/entities/crop_variety.entity';
import { Project } from 'src/project/entities/project.entity';
import { SellerNeed } from 'src/seller-need/entities/seller-need.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  description: string;

  @Column()
  planting_date: Date;

  @Column({ nullable: true })
  fertilizer_used: string;

  @Column({ nullable: true })
  yield: string;

  @Column({ nullable: true })
  water_usage: string;

  @Column({ nullable: true })
  photos: string;

  @OneToMany(() => Project, (project) => project.crop)
  projects: Project[];

  @OneToMany(() => CropVariety, (cropVarieties) => cropVarieties.crop, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  cropVariety: CropVariety[];

  @OneToMany(() => SellerNeed, (sellerNeed) => sellerNeed.crop, {
    cascade: true,
  })
  sellerNeeds: SellerNeed[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
