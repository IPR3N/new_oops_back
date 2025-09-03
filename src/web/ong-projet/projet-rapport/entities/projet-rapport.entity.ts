import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OngProjet } from '../../entities/ong-projet.entity';

@Entity()
export class ProjetRapport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column('text')
  contenu: string;

  @ManyToOne(() => OngProjet, (projet) => projet.rapports, {
    onDelete: 'CASCADE',
  })
  projet: OngProjet;

  //   @ManyToOne(() => User, { nullable: false })
  //   admin: User;

  @CreateDateColumn()
  createdAt: Date;
}
