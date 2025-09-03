import { Partenaire } from 'src/web/partenaire/entities/partenaire.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PartenaireProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  bio: string;

  @OneToMany(() => Partenaire, (partenaire) => partenaire.profile, {
    nullable: true,
  })
  partenaires: Partenaire[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
