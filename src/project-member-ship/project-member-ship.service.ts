import { Injectable } from '@nestjs/common';
import { CreateProjectMemberShipDto } from './dto/create-project-member-ship.dto';
import { UpdateProjectMemberShipDto } from './dto/update-project-member-ship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectMemberShip } from './entities/project-member-ship.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectMemberShipService {
  constructor(
    @InjectRepository(ProjectMemberShip)
    private readonly projectMemberShipRepository: Repository<ProjectMemberShip>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async addColoborateur(
    createProjectMemberShipDto: CreateProjectMemberShipDto,
  ): Promise<ProjectMemberShip> {
    const {
      project: projectId,
      user: userId,
      role,
    } = createProjectMemberShipDto;

    // Vérifier si le projet existe
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new Error('Project not found');
    }

    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Création du membre du projet
    const projectMember = this.projectMemberShipRepository.create({
      project,
      user,
      role,
    });

    return await this.projectMemberShipRepository.save(projectMember);
  }

  findAll() {
    return this.projectMemberShipRepository.find({
      relations: {
        project: true,
        user: true,
        tasks: true,
      },
    });
  }

  findOne(id: number) {
    return this.projectMemberShipRepository.findOne({
      where: { id: id },
      relations: {
        project: true,
        user: true,
        tasks: true,
      },
    });
  }

  findOneByProject(projectId: number) {
    return this.projectMemberShipRepository.find({
      where: { project: { id: projectId } },
      relations: {
        // project: true,
        user: true,
        tasks: true,
      },
    });
  }

  update(id: number, updateProjectMemberShipDto: UpdateProjectMemberShipDto) {
    const updateData = {
      ...updateProjectMemberShipDto,
      user: { id: updateProjectMemberShipDto.user },
      project: { id: updateProjectMemberShipDto.project },
    };
    return this.projectMemberShipRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.projectMemberShipRepository.delete(id);
  }
}
