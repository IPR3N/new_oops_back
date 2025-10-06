import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { CropModule } from './crop/crop.module';
import { ProjectMemberShipModule } from './project-member-ship/project-member-ship.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { CropVarietyModule } from './crop_variety/crop_variety.module';
import { TaskModule } from './task/task.module';
import { SharedNotesModule } from './shared-notes/shared-notes.module';
import { MailModule } from './mail/mail.module';
import { OopsModule } from './oops/oops.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { OopsLikeService } from './oops/oops-like/oops-like.service';
import { OopsCommentModule } from './oops/oops-comment/oops-comment.module';
import { OopsLikeModule } from './oops/oops-like/oops-like.module';
import { FrienshipModule } from './frienship/frienship.module';
// import { BrouillonsModule } from './brouillons/brouillons.module';
import { NotificationModule } from './notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProjetTransformationAgricoleModule } from './projet-transformation-agricole/projet-transformation-agricole.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StoryModule } from './story/story.module';
import { SellerNeedModule } from './seller-need/seller-need.module';
import { MessagesModule } from './messages/messages.module';
import { ProjectMediaModule } from './project-media/project-media.module';
import { ProjectMessagesModule } from './project_messages/project_messages.module';
import { PartenaireModule } from './web/partenaire/partenaire.module';
import { PartenaireProfileModule } from './web/partenaire-profile/partenaire-profile.module';
import { OngProjetModule } from './web/ong-projet/ong-projet.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    ProjectModule,
    CropModule,
    ProjectMemberShipModule,
    MarketplaceModule,
    CropVarietyModule,
    TaskModule,
    SharedNotesModule,
    MailModule,
    OopsModule,
    OopsLikeModule,
    OopsCommentModule,
    ProfileModule,
    FrienshipModule,
    NotificationModule,
    ProjetTransformationAgricoleModule,
    StoryModule,
    SellerNeedModule,
    MessagesModule,
    ProjectMediaModule,
    ProjectMessagesModule,
    PartenaireModule,
    PartenaireProfileModule,
    OngProjetModule,
    RegionModule,
    // BrouillonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
