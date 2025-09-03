import { OngProjet } from 'src/web/ong-projet/entities/ong-projet.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  description: string;

  @Column()
  pays: string;

  @Column()
  code: string;

  @Column('float')
  superficie: number;

  @Column('int')
  population: number;

  @Column()
  climat: string;

  @Column()
  biodiversite: string;

  @Column()
  environnement: string;

  @OneToMany(() => OngProjet, (projet) => projet.region)
  projets: OngProjet[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
