import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marketplace {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Project, (project) => project.marketplace, { onDelete: "CASCADE" })
    @JoinColumn()
    projectId: Project;



    // @Column({
    //     type: "text",
    //     nullable: true,
    // })
    // public_description: string;

}
