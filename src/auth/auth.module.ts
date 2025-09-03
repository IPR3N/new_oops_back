import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { MailModule } from 'src/mail/mail.module';
import { Partenaire } from 'src/web/partenaire/entities/partenaire.entity';
import { PartenaireProfile } from 'src/web/partenaire-profile/entities/partenaire-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Partenaire, PartenaireProfile]),
    MailModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
  ],
})
export class AuthModule {}
