import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    // Vérification si createProfileDto.user est bien un ID
    const user = await this.userRepository.findOne({
      where: { id: createProfileDto.user }, // Utilisation directe de l'ID
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Création du profil avec le bon user
    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      user, // Associe le bon utilisateur
    });

    return await this.profileRepository.save(newProfile);
  }

  findAll() {
    return this.profileRepository.find({
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id } });

    if (!profile) {
      throw new Error('Profile not found');
    }

    if (updateProfileDto.user) {
      const user = await this.userRepository.findOne({
        where: { id: updateProfileDto.user },
      });

      if (!user) {
        throw new Error('User not found');
      }

      profile.user = user;
    }

    Object.assign(profile, updateProfileDto);

    return this.profileRepository.save(profile);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
