import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Crop } from 'src/crop/entities/crop.entity';
import { CropVariety } from 'src/crop_variety/entities/crop_variety.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    @InjectRepository(CropVariety)
    private readonly cropVarietyRepository: Repository<CropVariety>,

    @InjectRepository(ProjectMemberShip)
    private readonly projectMemberShipRepository: Repository<ProjectMemberShip>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const crop = await this.cropRepository.findOne({
      where: { id: createProjectDto.crop_id },
    });
    if (!crop) {
      throw new Error('Crop not found');
    }

    const cropVariety = await this.cropVarietyRepository.findOne({
      where: { id: createProjectDto.cropVariety_id },
    });
    if (!cropVariety) {
      throw new Error('CropVariety not found');
    }

    createProjectDto.created_at = new Date();
    createProjectDto.updated_at = new Date();

    const project = this.projectRepository.create({
      ...createProjectDto,
      crop,
      cropVariety,
    });

    const savedProject = await this.projectRepository.save(project);

    if (createProjectDto.memberShip && createProjectDto.memberShip.length > 0) {
      // Convertir memberShip en tableau d'entiers si c'est une chaîne de caractères
      const memberShipIds = Array.isArray(createProjectDto.memberShip)
        ? createProjectDto.memberShip
        : createProjectDto.memberShip.split(',').map((id) => parseInt(id, 10));

      const users = await this.userRepository.findByIds(memberShipIds);

      if (users.length !== memberShipIds.length) {
        throw new Error('Some users were not found');
      }

      const memberships = users.map((user) => {
        return this.projectMemberShipRepository.create({
          user,
          project: savedProject,
          role: 'collaborator',
        });
      });
      await this.projectMemberShipRepository.save(memberships);
    } else {
      // Si aucun utilisateur n'a été sélectionné, créer un projet avec un membership vide
      const memberships = [];
      await this.projectMemberShipRepository.save(memberships);
    }

    return savedProject;
  }

  async findAll() {
    const project = await this.projectRepository.find({
      relations: {
        owner: true,
        crop: true,
        memberships: {
          user: true,
          tasks: true,
        },
        cropVariety: true,
        tasks: {
          project: true,
          taskOwner: {
            user: true,
          },
        },
      },

      order: {
        updated_at: 'DESC',
      },
    });
    return project;
  }

  findAllByUser(userId: number) {
    return this.projectRepository.find({
      where: {
        owner: { id: userId },
      },
      relations: {
        crop: true,
        memberships: {
          user: true,
          tasks: {
            taskOwner: true,
          },
        },
        owner: true,
        cropVariety: true,
        tasks: {
          project: true,
          taskOwner: {
            user: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id: id },
      relations: ['crop', 'memberships', 'tasks'],
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
