import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { OopsLike } from './entities/oops-like.entity';
import { Oops } from '../entities/oop.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateOopsLikeDto } from './dto/create-oops-like.dto';
import { OopsGateway } from '../oops-gateway/oops-geteway';

@Injectable()
export class OopsLikeService {
  constructor(
    @InjectRepository(OopsLike)
    private readonly likeRepository: Repository<OopsLike>,
    @InjectRepository(Oops)
    private readonly oopsRepository: Repository<Oops>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly oopsGateway: OopsGateway,
  ) {}

  async toggleLike(createOopsLikeDto: CreateOopsLikeDto, user: User) {
    const { oops: oopsId } = createOopsLikeDto;

    console.log('toggleLike called with oopsId:', oopsId, 'user:', user);
    if (!oopsId || !user) {
      throw new Error('Invalid post ID or user');
    }

    const oops = await this.oopsRepository.findOne({
      where: { id: oopsId },
      relations: ['likes'],
    });

    if (!oops) {
      throw new Error('Oops not found');
    }

    return await this.likeRepository.manager
      .transaction(async (manager) => {
        const existingLike = await manager.findOne(OopsLike, {
          where: {
            user: { id: user.id },
            oops: { id: oopsId },
          },
        });

        let likeCount: number;

        if (existingLike) {
          await manager.remove(OopsLike, existingLike);
          likeCount = await manager.count(OopsLike, {
            where: { oops: { id: oopsId } },
          });
          this.oopsGateway.sendLikeUpdate(oops.id, likeCount);
          return { oops: oops.id, likeCount, liked: false };
        } else {
          const newLike = manager.create(OopsLike, { user, oops });
          await manager.save(OopsLike, newLike);
          likeCount = await manager.count(OopsLike, {
            where: { oops: { id: oopsId } },
          });
          this.oopsGateway.sendLikeUpdate(oops.id, likeCount);
          return { oops: oops.id, likeCount, liked: true };
        }
      })
      .catch((error) => {
        console.error('Transaction failed:', error);
        if (error instanceof QueryFailedError) {
          throw new Error(`Database error: ${error.message}`);
        }
        throw error;
      });
  }

  // async toggleLike(createOopsLikeDto: CreateOopsLikeDto, user: User) {
  //   const { oops: oopsId } = createOopsLikeDto;

  //   const oops = await this.oopsRepository.findOne({
  //     where: { id: oopsId },
  //     relations: ['likes'],
  //   });

  //   if (!oops) throw new Error('Oops not found');

  //   const existingLike = await this.likeRepository.findOne({
  //     where: {
  //       user: { id: user.id },
  //       oops: { id: oopsId },
  //     },
  //   });

  //   if (existingLike) {
  //     await this.likeRepository.remove(existingLike);
  //     const likeCount = await this.likeRepository.count({
  //       where: { oops: { id: oopsId } },
  //     });
  //     this.oopsGateway.sendLikeUpdate(oops.id, likeCount);
  //     return { oops: oops.id, likeCount, liked: false };
  //   }
  //   const newLike = this.likeRepository.create({ user, oops });
  //   await this.likeRepository.save(newLike);
  //   const likeCount = await this.likeRepository.count({
  //     where: { oops: { id: oopsId } },
  //   });
  //   this.oopsGateway.sendLikeUpdate(oops.id, likeCount);
  //   return { oops: oops.id, likeCount, liked: true };
  // }
}
