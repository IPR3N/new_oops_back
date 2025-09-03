import { Crop } from 'src/crop/entities/crop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SellerNeed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Crop, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'produictId' })
  crop: Crop;
}
