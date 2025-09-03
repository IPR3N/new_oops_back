import { ProjectMemberShip } from "src/project-member-ship/entities/project-member-ship.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titre: string;

    @Column()
    description: string;


    @Column()
    priority: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    status: string;

    // @ManyToOne(() => Project, (project) => project.tasks, { nullable: false })
    // project: Project;

    @ManyToOne(() => Project, (project) => project.tasks, { nullable: false })
    project: Project;

    @ManyToOne(() => ProjectMemberShip, (membership) => membership.tasks, { nullable: false })
    taskOwner: ProjectMemberShip;


    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}
