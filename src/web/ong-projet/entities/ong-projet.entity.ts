import { User } from 'src/user/entities/user.entity';
import { Partenaire } from 'src/web/partenaire/entities/partenaire.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjetRapport } from '../projet-rapport/entities/projet-rapport.entity';
import { Region } from 'src/region/entities/region.entity';

@Entity()
export class OngProjet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.ongProjets)
  @JoinTable()
  beneficiaires: User[];

  @OneToMany(() => ProjetRapport, (rapport) => rapport.projet)
  rapports: ProjetRapport[];

  @ManyToOne(() => Partenaire, (partenaire) => partenaire.projets, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'partenaireId' })
  partenaire: Partenaire;

  @ManyToOne(() => Region, (region) => region.projets, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @Column({ type: 'date', nullable: true })
  dateDebut: Date;

  @Column({ type: 'date', nullable: true })
  dateFinPrevue: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
