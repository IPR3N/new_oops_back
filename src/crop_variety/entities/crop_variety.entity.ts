import { Crop } from "src/crop/entities/crop.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CropVariety {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column()
    standard_temperature: string;

    @Column()
    standard_humidity: string;

    @Column()
    days_to_croissant: number;

    @Column()
    days_to_germinate: number;

    @Column()
    days_to_maturity: number;

    // @Column()
    // maturity_level: string;

    @ManyToOne(() => Crop, (crop) => crop.cropVariety, { nullable: true, eager: true })
    crop: Crop;

    @OneToMany(() => Project, (project) => project.cropVariety, { nullable: true })
    projects: Project[];

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}
