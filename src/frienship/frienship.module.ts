import { Module } from '@nestjs/common';
import { FrienshipService } from './frienship.service';
import { FrienshipController } from './frienship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frienship } from './entities/frienship.entity';
import { User } from 'src/user/entities/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Notification } from 'src/notification/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Frienship, Notification]),
    EventEmitterModule.forRoot(), // Importer EventEmitterModule
  ],

  controllers: [FrienshipController],
  providers: [FrienshipService],
})
export class FrienshipModule {}
