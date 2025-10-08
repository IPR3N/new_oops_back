import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectMessageDto } from './dto/create-project_message.dto';
import { UpdateProjectMessageDto } from './dto/update-project_message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectMessage } from './entities/project_message.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProjectMessagesService {
  private readonly logger = new Logger('ProjectMessagesService');

  constructor(
    @InjectRepository(ProjectMessage)
    private readonly messageRepository: Repository<ProjectMessage>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Helper method to serialize message for consistent format
  private serializeMessage(message: ProjectMessage) {
    return {
      id: message.id,
      content: message.content,
      senderId: message.sender?.id,
      senderName:
        message.sender?.prenom ||
        `${message.sender?.nom || ''} ${message.sender?.prenom || ''}`.trim(),
      projectId: message.project?.id,
      created_at: message.created_at,
      fileUrl: message.fileUrl,
      fileType: message.fileType,
      // Also include full objects for backward compatibility
      sender: message.sender,
      project: message.project,
    };
  }

  async create(
    createMessageDto: CreateProjectMessageDto,
    userId: number,
    file?: Express.Multer.File,
  ): Promise<any> {
    this.logger.log(
      `Création message pour utilisateur ${userId}, projet ${createMessageDto.projectId}, contenu : ${createMessageDto.content}`,
    );
    try {
      const project = await this.projectRepository.findOne({
        where: { id: createMessageDto.projectId },
      });

      if (!project) {
        this.logger.error(`Projet ${createMessageDto.projectId} non trouvé`);
        throw new NotFoundException('Projet non trouvé');
      }

      const sender = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!sender) {
        this.logger.error(`Utilisateur ${userId} non trouvé`);
        throw new NotFoundException('Utilisateur non trouvé');
      }

      const message = this.messageRepository.create({
        content: createMessageDto.content || (file ? 'Fichier téléchargé' : ''),
        project,
        sender,
        fileUrl: file ? `uploads/${file.filename}` : null,
        fileType: file ? file.mimetype : null,
      });

      const savedMessage = await this.messageRepository.save(message);
      this.logger.log(`Message enregistré : ${JSON.stringify(savedMessage)}`);

      const result = await this.messageRepository.findOne({
        where: { id: savedMessage.id },
        relations: ['sender', 'project'],
      });
      this.logger.log(`Message avec relations : ${JSON.stringify(result)}`);

      return this.serializeMessage(result);
    } catch (error) {
      this.logger.error(
        `Erreur lors de la création du message : ${error.message}`,
      );
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    this.logger.log('Récupération de tous les messages');
    const messages = await this.messageRepository.find({
      relations: ['sender', 'project'],
      order: { created_at: 'ASC' },
    });
    return messages.map((msg) => this.serializeMessage(msg));
  }

  async findAllByProject(projectId: number): Promise<any[]> {
    this.logger.log(`Récupération messages pour projet ${projectId}`);
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      this.logger.error(`Projet ${projectId} non trouvé`);
      throw new NotFoundException('Projet non trouvé');
    }
    const messages = await this.messageRepository.find({
      where: { project: { id: projectId } },
      relations: ['sender', 'project'],
      order: { created_at: 'ASC' },
    });
    this.logger.log(
      `Trouvé ${messages.length} messages pour projet ${projectId}`,
    );
    return messages.map((msg) => this.serializeMessage(msg));
  }

  async findOne(id: number): Promise<any> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'project'],
    });

    if (!message) {
      this.logger.error(`Message ${id} non trouvé`);
      throw new NotFoundException('Message non trouvé');
    }

    return this.serializeMessage(message);
  }

  async update(
    id: number,
    updateMessageDto: UpdateProjectMessageDto,
    userId: number,
  ): Promise<any> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'project'],
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    if (message.sender.id !== userId) {
      this.logger.error(
        `Utilisateur ${userId} a tenté de mettre à jour le message ${id} appartenant à ${message.sender.id}`,
      );
      throw new UnauthorizedException(
        'Vous ne pouvez mettre à jour que vos propres messages',
      );
    }

    Object.assign(message, updateMessageDto);
    const updated = await this.messageRepository.save(message);

    const result = await this.messageRepository.findOne({
      where: { id: updated.id },
      relations: ['sender', 'project'],
    });

    return this.serializeMessage(result);
  }

  async remove(id: number, userId: number): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender'],
    });

    if (!message) {
      throw new NotFoundException('Message non trouvé');
    }

    if (message.sender.id !== userId) {
      this.logger.error(
        `Utilisateur ${userId} a tenté de supprimer le message ${id} appartenant à ${message.sender.id}`,
      );
      throw new UnauthorizedException(
        'Vous ne pouvez supprimer que vos propres messages',
      );
    }
    await this.messageRepository.remove(message);
  }
}
