import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOopsCommentDto } from './dto/create-oops-comment.dto';
import { UpdateOopsCommentDto } from './dto/update-oops-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Oops } from '../entities/oop.entity';
import { Repository } from 'typeorm';
import { OopsComment } from './entities/oops-comment.entity';
import { User } from 'src/user/entities/user.entity';
import { OopsLike } from '../oops-like/entities/oops-like.entity';

@Injectable()
export class OopsCommentService {
  constructor(
    @InjectRepository(OopsComment)
    private readonly commentRepository: Repository<OopsComment>,
    @InjectRepository(Oops)
    private readonly oopsRepository: Repository<Oops>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createOopsCommentDto: CreateOopsCommentDto,
    user: User, // Déjà l'utilisateur connecté
  ): Promise<OopsComment> {
    const {
      content,
      oops: oopsId,
      parentComment: parentCommentId,
    } = createOopsCommentDto;

    // Recherche du post (oops)
    const oops = oopsId
      ? await this.oopsRepository.findOne({
          where: { id: oopsId },
        })
      : null;
    if (oopsId && !oops) {
      throw new NotFoundException('Oops not found');
    }

    // Recherche du commentaire parent (si c'est une réponse à un commentaire)
    let parentComment: OopsComment = null;
    if (parentCommentId) {
      parentComment = await this.commentRepository.findOne({
        where: { id: parentCommentId },
      });
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
    }

    // Création du commentaire avec l'utilisateur connecté
    const newComment = this.commentRepository.create({
      content,
      user,
      oops,
      parentComment,
    });

    return await this.commentRepository.save(newComment);
  }

  findAll() {
    return this.commentRepository.find({
      relations: ['user', 'oops', 'parentComment'],
    });
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: { id: id },
      relations: ['user', 'oops', 'parentComment'],
    });
  }

  async update(
    id: number,
    updateOopsCommentDto: UpdateOopsCommentDto,
    user: User, // Utilisateur connecté
  ): Promise<OopsComment> {
    const { content } = updateOopsCommentDto;

    // Vérifier si le commentaire existe
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'], // Charger l'utilisateur du commentaire
    });

    if (!comment) {
      throw new NotFoundException('Commentaire non trouvé');
    }

    // Vérifier que l'utilisateur connecté est bien l'auteur du commentaire
    if (comment.user.id !== user.id) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à modifier ce commentaire",
      );
    }

    // Mise à jour du commentaire
    comment.content = content;

    return await this.commentRepository.save(comment);
  }

  // update(id: number, updateOopsCommentDto: UpdateOopsCommentDto) {
  //   return this.commentRepository.update(id, updateOopsCommentDto);
  // }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
