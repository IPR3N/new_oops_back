import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFrienshipDto } from './dto/create-frienship.dto';
import { UpdateFrienshipDto } from './dto/update-frienship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Frienship } from './entities/frienship.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FrienshipService {
  constructor(
    @InjectRepository(Frienship)
    private friendshipRepo: Repository<Frienship>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}
  async sendFriendRequest(requesterId: number, receiverId: number) {
    console.log(requesterId, receiverId);

    if (requesterId === receiverId)
      throw new BadRequestException('Tu ne peux pas t’envoyer une demande.');

    const existingRequest = await this.friendshipRepo.findOne({
      where: { requester: { id: requesterId }, receiver: { id: receiverId } },
    });

    if (existingRequest)
      throw new BadRequestException('Une demande existe déjà.');

    const requester = await this.userRepo.findOne({
      where: { id: requesterId },
    });
    const receiver = await this.userRepo.findOne({ where: { id: receiverId } });

    const friendship = this.friendshipRepo.create({
      requester,
      receiver,
      status: 'pending',
    });

    this.eventEmitter.emit('friend.request', {
      receiverId,
      requesterName: `${requester.nom} ${requester.prenom}`,
    });

    return this.friendshipRepo.save(friendship);
  }

  // async acceptFriendRequest(requesterId: number, receiverId: number) {
  //   console.log(
  //     `Recherche demande: requesterId=${requesterId}, receiverId=${receiverId}`,
  //   );
  //   const friendship = await this.friendshipRepo.findOne({
  //     where: {
  //       requester: { id: requesterId },
  //       receiver: { id: receiverId },
  //       status: 'pending',
  //     },
  //     relations: ['requester', 'receiver'],
  //   });

  //   if (!friendship) {
  //     console.log('Demande non trouvée');
  //     throw new NotFoundException('Demande non trouvée ou déjà traitée.');
  //   }

  //   console.log('Demande trouvée:', friendship);
  //   friendship.status = 'accepted';
  //   const updatedFriendship = await this.friendshipRepo.save(friendship);
  //   console.log('Demande mise à jour:', updatedFriendship);

  //   this.eventEmitter.emit('friend.accepted', {
  //     receiverId: requesterId,
  //     requesterName: `${friendship.receiver.nom} ${friendship.receiver.prenom}`,
  //   });
  //   console.log('Événement émis');

  //   return updatedFriendship;
  // }

  // FriendshipService.ts

  async acceptFriendRequest(requesterId: number, receiverId: number) {
    try {
      const friendship = await this.friendshipRepo.findOne({
        where: {
          requester: { id: requesterId },
          receiver: { id: receiverId },
          status: 'pending',
        },
        relations: ['requester', 'receiver'],
      });

      if (!friendship) {
        throw new NotFoundException('Demande non trouvée ou déjà traitée.');
      }

      friendship.status = 'accepted';
      console.log('Avant sauvegarde:', friendship);
      const updatedFriendship = await this.friendshipRepo.save(friendship);
      console.log('Après sauvegarde:', updatedFriendship);

      this.eventEmitter.emit('friend.accepted', {
        receiverId: requesterId,
        requesterName: `${friendship.receiver.nom} ${friendship.receiver.prenom}`,
      });

      return updatedFriendship;
    } catch (error) {
      throw error;
    }
  }
  async declineFriendRequest(requesterId: number, receiverId: number) {
    const friendship = await this.friendshipRepo.findOne({
      where: {
        requester: { id: requesterId },
        receiver: { id: receiverId },
        status: 'pending',
      },
      relations: ['requester'],
    });

    if (!friendship) {
      throw new NotFoundException('Demande non trouvée ou déjà traitée.');
    }

    await this.friendshipRepo.delete(friendship.id);

    // Émettre l'événement de refus (notification au requester)
    this.eventEmitter.emit('friend.declined', {
      receiverId: requesterId,
      requesterName: `${friendship.receiver.nom} ${friendship.receiver.prenom}`,
    });

    return { message: 'Demande refusée' };
  }

  // async getFriends(userId: number) {
  //   const friendships = await this.friendshipRepo.find({
  //     where: [
  //       { requester: { id: userId }, status: 'accepted' },
  //       { receiver: { id: userId }, status: 'accepted' },
  //     ],
  //     relations: {
  //       requester: {
  //         receivedRequests: true,
  //         sentRequests: true,
  //         proofile: true,
  //       },
  //     },
  //   });

  //   return friendships.map((friendship) =>
  //     friendship.requester.id === userId
  //       ? friendship.receiver
  //       : friendship.requester,
  //   );
  // }

  async getFriends(userId: number) {
    // Validate user exists
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const friendships = await this.friendshipRepo.find({
      where: [
        { requester: { id: userId }, status: 'accepted' },
        { receiver: { id: userId }, status: 'accepted' },
      ],
      relations: {
        requester: {
          receivedRequests: true,
          sentRequests: true,
          proofile: true, // Fixed typo
        },
        receiver: {
          receivedRequests: true,
          sentRequests: true,
          proofile: true,
        },
      },
    });

    // Log raw data for debugging
    console.log(JSON.stringify(friendships, null, 2));

    return friendships
      .filter((friendship) => friendship.requester && friendship.receiver) // Skip invalid records
      .map((friendship) =>
        friendship.requester.id === userId
          ? friendship.receiver
          : friendship.requester,
      );
  }

  async suggestFriends(userId: number) {
    const friends = await this.getFriends(userId);
    const friendIds = friends.map((friend) => friend.id);

    if (friendIds.length === 0) return [];

    const potentialFriends = await this.friendshipRepo.find({
      where: [
        { requester: { id: In(friendIds) }, status: 'accepted' },
        { receiver: { id: In(friendIds) }, status: 'accepted' },
      ],
      relations: ['requester', 'receiver'],
    });

    const suggestedFriends = potentialFriends
      .map((friendship) =>
        friendIds.includes(friendship.requester.id)
          ? friendship.receiver
          : friendship.requester,
      )
      .filter(
        (friend) => friend.id !== userId && !friendIds.includes(friend.id),
      );

    return Array.from(
      new Set(suggestedFriends.map((f) => JSON.stringify(f))),
    ).map((f) => JSON.parse(f));
  }

  async getIncomingFriendRequests(
    userId: number,
    status?: 'pending' | 'accepted' | 'all',
  ) {
    try {
      const queryStatus = status || 'all';

      const whereClause =
        queryStatus === 'all'
          ? { receiver: { id: userId } }
          : { receiver: { id: userId }, status: queryStatus };

      const requests = await this.friendshipRepo.find({
        where: whereClause,
        relations: ['requester'],
        order: {
          createdAt: 'DESC',
        },
      });

      const incomingRequests = requests.map((request) => ({
        id: request.id,
        requester: {
          id: request.requester.id,
          nom: request.requester.nom,
          prenom: request.requester.prenom,
        },
        status: request.status,
        createdAt: request.createdAt,
      }));

      return {
        requests: incomingRequests,
        total: incomingRequests.length,
      };
    } catch (error) {
      throw new BadRequestException(
        "Erreur lors de la récupération des demandes d'amitié entrantes",
      );
    }
  }

  async getOutgoingFriendRequests(
    userId: number,
    status?: 'pending' | 'accepted' | 'all',
  ) {
    try {
      const queryStatus = status || 'all';

      const whereClause =
        queryStatus === 'all'
          ? { requester: { id: userId } }
          : { requester: { id: userId }, status: queryStatus };
      const requests = await this.friendshipRepo.find({
        where: whereClause,
        relations: ['receiver'],
        order: {
          createdAt: 'DESC',
        },
      });

      const outgoingRequests = requests.map((request) => ({
        id: request.id,
        receiver: {
          id: request.receiver.id,
          nom: request.receiver.nom,
          prenom: request.receiver.prenom,
        },
        status: request.status,
        createdAt: request.createdAt,
      }));

      return {
        requests: outgoingRequests,
        total: outgoingRequests.length,
      };
    } catch (error) {
      throw new BadRequestException(
        "Erreur lors de la récupération des demandes d'amitié envoyées",
      );
    }
  }

  async cancelFriendRequest(requesterId: number, receiverId: number) {
    const friendship = await this.friendshipRepo.findOne({
      where: {
        requester: { id: requesterId },
        receiver: { id: receiverId },
        status: 'pending',
      },
      relations: ['receiver'],
    });

    if (!friendship) {
      throw new NotFoundException('Demande non trouvée ou déjà traitée.');
    }
    await this.friendshipRepo.delete(friendship.id);

    this.eventEmitter.emit('friend.cancelled', {
      receiverId: receiverId,
      requesterName: `${friendship.requester.nom} ${friendship.requester.prenom}`,
    });

    return { message: 'Demande annulée avec succès' };
  }

  async removeFriend(userId: number, friendId: number) {
    const friendship = await this.friendshipRepo.findOne({
      where: [
        {
          requester: { id: userId },
          receiver: { id: friendId },
          status: 'accepted',
        },
        {
          requester: { id: friendId },
          receiver: { id: userId },
          status: 'accepted',
        },
      ],
      relations: ['requester', 'receiver'],
    });

    if (!friendship) {
      throw new NotFoundException("Relation d'amitié non trouvée");
    }

    await this.friendshipRepo.delete(friendship.id);

    const otherUserId =
      friendship.requester.id === userId
        ? friendship.receiver.id
        : friendship.requester.id;
    const user = await this.userRepo.findOne({ where: { id: userId } });

    this.eventEmitter.emit('friend.removed', {
      removedUserId: otherUserId,
      requesterName: `${user.nom} ${user.prenom}`,
    });

    return { message: 'Ami supprimé avec succès' };
  }

  async unfollow(userId: number, followedId: number) {
    const friendship = await this.friendshipRepo.findOne({
      where: {
        requester: { id: userId },
        receiver: { id: followedId },
      },
      relations: ['receiver'],
    });

    if (!friendship) {
      throw new NotFoundException('Relation non trouvée');
    }

    await this.friendshipRepo.delete(friendship.id);

    this.eventEmitter.emit('user.unfollowed', {
      unfollowedId: followedId,
      requesterName: `${friendship.requester.nom} ${friendship.requester.prenom}`,
    });

    return { message: 'Vous ne suivez plus cette personne' };
  }
}
