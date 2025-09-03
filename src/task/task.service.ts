import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProjectMemberShip } from 'src/project-member-ship/entities/project-member-ship.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectMemberShip)
    private readonly projectMemberShipRepository: Repository<ProjectMemberShip>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const project = await this.projectRepository.findOne({
      where: { id: createTaskDto.project },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const taskOwner = await this.projectMemberShipRepository.findOne({
      where: { id: createTaskDto.taskOwner },
    });

    if (!taskOwner) {
      throw new Error('Task Owner not found');
    }

    createTaskDto.created_at = new Date();

    const task = this.taskRepository.create({
      ...createTaskDto,
      project,
      taskOwner,
    });

    const savedTask = await this.taskRepository.save(task);

    return savedTask;
  }

  findAll() {
    return this.taskRepository.find({
      relations: {
        project: true,
        taskOwner: {
          user: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: {
        project: true,
        taskOwner: {
          user: true,
        },
      },
    });
  }

  findByProject(project: number) {
    return this.taskRepository.find({
      where: {
        project: { id: project },
      },
      relations: {
        project: true,
        taskOwner: {
          user: true,
        },
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const project = await this.projectRepository.findOne({
      where: { id: updateTaskDto.project },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const taskOwner = await this.projectMemberShipRepository.findOne({
      where: { id: updateTaskDto.taskOwner },
    });

    if (!taskOwner) {
      throw new Error('Task Owner not found');
    }

    const updatedTask = {
      ...updateTaskDto,
      project,
      taskOwner,
    };

    return this.taskRepository.update(id, updatedTask);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
