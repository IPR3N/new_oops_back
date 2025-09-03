import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectMediaDto } from './dto/create-project-media.dto';
import { UpdateProjectMediaDto } from './dto/update-project-media.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectMedia } from './entities/project-media.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import path from 'path';
import fs from 'fs';

@Injectable()
export class ProjectMediaService {
  constructor(
    @InjectRepository(ProjectMedia)
    private readonly pmediaRepos: Repository<ProjectMedia>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(
    createProjectMediaDto: CreateProjectMediaDto,
    files: Express.Multer.File[],
  ): Promise<ProjectMedia[]> {
    const { project: projectId } = createProjectMediaDto;

    // Vérifier si le projet existe
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    // Traiter chaque fichier uploadé
    const projectMedias: ProjectMedia[] = [];
    for (const file of files) {
      const projectMedia = this.pmediaRepos.create({
        img: `uploads/${file.filename}`, // Chemin relatif de l'image
        project,
      });
      projectMedias.push(await this.pmediaRepos.save(projectMedia));
    }

    return projectMedias;
  }

  async findAll(): Promise<ProjectMedia[]> {
    return await this.pmediaRepos.find({
      relations: ['project'],
    });
  }

  async findOne(id: number): Promise<ProjectMedia> {
    const projectMedia = await this.pmediaRepos.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!projectMedia) {
      throw new NotFoundException(`ProjectMedia with ID ${id} not found`);
    }
    return projectMedia;
  }

  async update(
    id: number,
    updateProjectMediaDto: UpdateProjectMediaDto,
    file?: Express.Multer.File,
  ): Promise<ProjectMedia> {
    const projectMedia = await this.findOne(id);

    // Mettre à jour le projet si fourni
    if (updateProjectMediaDto.project) {
      const project = await this.projectRepository.findOne({
        where: { id: updateProjectMediaDto.project },
      });
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${updateProjectMediaDto.project} not found`,
        );
      }
      projectMedia.project = project;
    }

    // Mettre à jour l'image si un fichier est fourni
    if (file) {
      // Supprimer l'ancienne image si elle existe
      if (projectMedia.img) {
        const oldImagePath = path.join(process.cwd(), projectMedia.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      projectMedia.img = `uploads/${file.filename}`;
    }

    return await this.pmediaRepos.save(projectMedia);
  }

  async remove(id: number): Promise<void> {
    const projectMedia = await this.findOne(id);
    // Supprimer l'image du système de fichiers
    if (projectMedia.img) {
      const imagePath = path.join(process.cwd(), projectMedia.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await this.pmediaRepos.remove(projectMedia);
  }
}
