import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: {
        sentRequests: {
          receiver: true,
        },
        receivedRequests: {
          requester: true,
        },
        createdProjects: true,
        memberships: { project: true },
      },
    });
    return this.removePasswords(users);
  }

  async findOne(id: number) {
    const oneUser = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        sentRequests: {
          receiver: true,
        },
        receivedRequests: {
          requester: true,
        },
        createdProjects: true,
        memberships: { project: true },
      },
    });

    return this.removePassword(oneUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  private removePassword(user: User): Partial<User> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private removePasswords(users: User[]): Partial<User>[] {
    return users.map((user) => this.removePassword(user));
  }
}
