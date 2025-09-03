import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  photoProfile?: string;

  @Column({ type: 'varchar', nullable: true })
  photoCouverture?: string;

  @Column({
    nullable: true,
  })
  location: string;

  @Column()
  username: string;

  @Column()
  dob: string;

  @OneToOne(() => User, (user) => user.proofile)
  user: User;
}
