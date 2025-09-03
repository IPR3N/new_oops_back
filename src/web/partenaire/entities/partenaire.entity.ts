import { OngProjet } from 'src/web/ong-projet/entities/ong-projet.entity';
import { PartenaireProfile } from 'src/web/partenaire-profile/entities/partenaire-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Partenaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  //   @Column()
  //   type_partenaire: number;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  adresse: string;

  @Column()
  site_web: string;

  @Column()
  password: string;

  @ManyToOne(() => PartenaireProfile, (profile) => profile.partenaires, {
    nullable: false,
  })
  @JoinColumn({ name: 'profileId' })
  profile: PartenaireProfile;

  @OneToMany(() => OngProjet, (projet) => projet.partenaire) // Relation inverse
  projets: OngProjet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
