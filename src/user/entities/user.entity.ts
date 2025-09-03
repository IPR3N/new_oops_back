import { Frienship } from 'src/frienship/entities/frienship.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Oops } from 'src/oops/entities/oop.entity';
import { OopsComment } from 'src/oops/oops-comment/entities/oops-comment.entity';
import { OopsLike } from 'src/oops/oops-like/entities/oops-like.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectMessage } from 'src/project_messages/entities/project_message.entity';
import { OngProjet } from 'src/web/ong-projet/entities/ong-projet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.owner, { onDelete: 'CASCADE' })
  createdProjects: Project[];

  @OneToMany(() => ProjectMemberShip, (membership) => membership.user, {
    onDelete: 'CASCADE',
  })
  memberships: ProjectMemberShip[];

  @OneToMany(() => Oops, (oops) => oops.user)
  oops: Oops[];

  @OneToMany(() => OopsComment, (oopsComment) => oopsComment.user)
  oopsComments: OopsComment[];

  @OneToMany(() => OopsLike, (oopsLike) => oopsLike.user)
  likedOops: OopsLike[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userid',
    referencedColumnName: 'id',
  })
  proofile: Profile;

  @OneToMany(() => ProjectMessage, (message) => message.sender)
  messages: ProjectMessage[];

  @OneToMany(() => Frienship, (friendship) => friendship.requester)
  sentRequests: Frienship[];

  @OneToMany(() => Frienship, (friendship) => friendship.receiver)
  receivedRequests: Frienship[];

  @ManyToMany(() => OngProjet, (ongProjet) => ongProjet.beneficiaires)
  ongProjets: OngProjet[];
}
