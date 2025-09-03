import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOopDto } from './dto/create-oop.dto';
import { UpdateOopDto } from './dto/update-oop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Oops } from './entities/oop.entity';
import { Repository } from 'typeorm';
import { OopsComment } from './oops-comment/entities/oops-comment.entity';
import { User } from 'src/user/entities/user.entity';
import { OopsLike } from './oops-like/entities/oops-like.entity';

@Injectable()
export class OopsService {
  constructor(
    @InjectRepository(Oops) private oopsRepo: Repository<Oops>,
    @InjectRepository(OopsComment) private commentRepo: Repository<OopsComment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(OopsLike) private oopsLikeRepo: Repository<OopsLike>,
  ) {}

  async create(createOopDto: CreateOopDto) {
    const user = await this.userRepo.findOne({
      where: { id: createOopDto.user },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let sharedFrom: Oops | null = null;
    if (createOopDto.sharedFrom) {
      sharedFrom = await this.oopsRepo.findOne({
        where: { id: createOopDto.sharedFrom },
      });

      if (!sharedFrom) {
        throw new NotFoundException('Shared post not found');
      }
    }

    const newOop = this.oopsRepo.create({
      ...createOopDto,
      user,
      sharedFrom, // Assigner l'entité complète et non un ID
      likes: [],
      comments: [],
    });

    return this.oopsRepo.save(newOop);
  }

  async shareOops(
    oopsId: number,
    user: User,
    customMessage?: string,
  ): Promise<Oops> {
    const originalOops = await this.oopsRepo.findOne({
      where: { id: oopsId },
      relations: ['sharedFrom'],
    });

    if (!originalOops) {
      throw new NotFoundException('Oops not found');
    }

    const sharedOops = this.oopsRepo.create({
      user,
      sharedFrom: originalOops,
      content: customMessage || null,
    });

    return await this.oopsRepo.save(sharedOops);
  }

  findAll() {
    return this.oopsRepo.find({
      relations: {
        user: {
          proofile: true,
        },
        comments: true,
        likes: true,
        sharedFrom: true,
        sharedPosts: true,
      },
    });
  }

  findOne(id: number) {
    return this.oopsRepo.findOne({
      where: { id },
      relations: {
        user: {
          proofile: true,
        },
        comments: true,
        likes: true,
        sharedFrom: true,
        sharedPosts: true,
      },
    });
  }

  findAllOopsByUser(userId: number) {
    return this.oopsRepo.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
        comments: true,
        likes: true,
        sharedFrom: true,
        sharedPosts: true,
      },
    });
  }

  update(id: number, updateOopDto: UpdateOopDto) {}

  remove(id: number) {
    return this.oopsRepo.delete({ id });
  }
}
