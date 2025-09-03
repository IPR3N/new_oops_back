import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from './hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { SignupDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MailService } from 'src/mail/mail.service';
import { RestaurePasswordDto } from './dto/restaure-password.dto';
import { Partenaire } from 'src/web/partenaire/entities/partenaire.entity';
import { PartenaireProfile } from 'src/web/partenaire-profile/entities/partenaire-profile.entity';
import { SignUpPartenaireDto } from './dto/sign-up-partenaire.dto';

export interface VerificationCode {
  code: string;
  expiresAt: Date;
  partenaireDto?: SignUpPartenaireDto;
}

@Injectable()
export class AuthService {
  // private verificationCodes: {
  //   [key: string]: { code: string; expiresAt: Date };
  // } = {};
  private verificationCodes: { [key: string]: VerificationCode } = {};

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private hasshingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConffigutation: ConfigType<typeof jwtConfig>,
    private mailService: MailService,

    @InjectRepository(Partenaire)
    private readonly partenaireRepository: Repository<Partenaire>,
    @InjectRepository(PartenaireProfile)
    private readonly profileRepository: Repository<PartenaireProfile>,
  ) {}

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(email: string, code: string) {
    await this.mailService.sendEmail({
      to: email,
      subject: 'Votre code de vérification OOPSFARM',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4CAF50; text-align: center;">OOPSFARM</h2>
        <p>Bonjour,</p>
        <p>Merci de vérifier votre adresse e-mail. Voici votre 'code' de vérification :</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #4CAF50;">${code}</span>
        </div>
        <p>Veuillez entrer ce 'code' dans l'application pour terminer le processus de vérification.</p>
        <p style="font-size: 12px; color: #777;">Si vous n'avez pas demandé ce code, veuillez ignorer cet e-mail.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; text-align: center; color: #777;">
          &copy; ${new Date().getFullYear()} OOPSFARM. Tous droits réservés.
        </p>
      </div>
    `,
    });
  }

  async signUp(signUpDto: SignupDto) {
    try {
      const verificationCode = this.generateVerificationCode();
      await this.sendVerificationCode(signUpDto.email, verificationCode);

      const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
      this.verificationCodes[signUpDto.email] = {
        code: verificationCode,
        expiresAt,
      };

      return { message: 'Code de vérification envoyé à votre adresse e-mail' };
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async verifyCode(email: string, code: string, signUpDto: SignupDto) {
    const storedCode = this.verificationCodes[email];

    if (new Date() > storedCode.expiresAt) {
      throw new UnauthorizedException('Le code de vérification a expiré');
    }
    if (storedCode.code !== code) {
      throw new UnauthorizedException('Code de vérification incorrect');
    }
    delete this.verificationCodes[email];

    const user = new User();
    user.nom = signUpDto.nom;
    user.prenom = signUpDto.prenom;
    user.email = signUpDto.email;
    user.password = await this.hasshingService.hash(signUpDto.password);
    await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async regenerateVerificationCode(email: string) {
    const verificationCode = this.generateVerificationCode();
    await this.sendVerificationCode(email, verificationCode);
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    this.verificationCodes[email] = { code: verificationCode, expiresAt };
    return {
      message: 'Nouveau code de vérification envoyé à votre adresse e-mail',
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException("l'utilisateur n'existe pas");
    }

    const isEqual = await this.hasshingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('mot de passe incorrect');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        profile: user.proofile,
        // role: user.role
      },
      {
        audience: this.jwtConffigutation.audience,
        issuer: this.jwtConffigutation.issuer,
        secret: this.jwtConffigutation.secret,
        expiresIn: this.jwtConffigutation.accessTokenTtl,
      },
    );

    return {
      accessToken,
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: changePasswordDto.userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }

    const isCurrentPasswordValid = await this.hasshingService.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Mot de passe actuel incorrect');
    }

    user.password = await this.hasshingService.hash(
      changePasswordDto.newPassword,
    );
    await this.userRepository.save(user);
    return { message: 'Mot de passe modifié avec succès' };
  }

  async verfiUserByEmailAndSendEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }

    const verificationCode = this.generateVerificationCode();
    await this.sendVerificationCode(email, verificationCode);

    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    this.verificationCodes[email] = { code: verificationCode, expiresAt };
    return {
      user,
      message: 'Code de vérification envoyé à votre adresse e-mail',
    };
  }

  // private generateVerificationCode(): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const code = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  //   return code;
  // }

  async forgotPassword(email: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }

    const verificationCode = this.generateVerificationCode();
    await this.sendVerificationCode(email, verificationCode);

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 3 minutes
    this.verificationCodes[email] = { code: verificationCode, expiresAt };

    return { message: 'Code de vérification envoyé à votre adresse e-mail' };
  }

  async verifyCodeForRestaurePassword(email: string, code: string) {
    const storedCode = this.verificationCodes[email];

    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (new Date() > storedCode.expiresAt) {
      throw new UnauthorizedException('Le code de vérification a expiré');
    }
    if (storedCode.code !== code) {
      throw new UnauthorizedException('Code de vérification incorrect');
    }

    delete this.verificationCodes[email];

    return {
      user,
      message: 'Code de vérification correct',
    };
  }

  async restaurePassword(restaurePasswordDto: RestaurePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: restaurePasswordDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }
    user.password = await this.hasshingService.hash(
      restaurePasswordDto.newPassword,
    );
    await this.userRepository.save(user);

    return { message: 'Mot de passe réinitialisé avec succès' };
  }

  async sendPasswordChangeEmail(email: string, code: string) {
    const changePasswordUrl = `http://localhost:4200/authentication/change_password?email=${encodeURIComponent(email)}`;
    await this.mailService.sendEmail({
      to: email,
      subject: 'Changement de mot de passe requis - OOPSFARM',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4CAF50; text-align: center;">OOPSFARM</h2>
        <p>Bonjour,</p>
        <p>Pour finaliser votre inscription, veuillez changer votre mot de passe en cliquant sur le lien ci-dessous :</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${changePasswordUrl}" style="font-size: 18px; color: #4CAF50; text-decoration: none; font-weight: bold;">Changer mon mot de passe</a>
        </div>
        <p>Votre code de vérification est :</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #4CAF50;">${code}</span>
        </div>
        <p>Veuillez copier ce code et l'entrer dans le formulaire de changement de mot de passe. Ce code est valide pendant 3 minutes.</p>
        <p>Si vous n'avez pas initié cette demande, veuillez ignorer cet e-mail.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; text-align: center; color: #777;">
          &copy; ${new Date().getFullYear()} OOPSFARM. Tous droits réservés.
        </p>
      </div>
      `,
    });
  }

  async signUpPartenaire(
    signUpPartenaireDto: SignUpPartenaireDto,
  ): Promise<{ message: string }> {
    const { nom, email, password, telephone, adresse, site_web, profileId } =
      signUpPartenaireDto;

    const existingPartenaire = await this.partenaireRepository.findOneBy({
      email,
    });
    if (existingPartenaire) {
      throw new ConflictException('Email déjà utilisé');
    }

    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profil avec l'ID ${profileId} non trouvé`);
    }

    if (!password) {
      throw new BadRequestException('Mot de passe requis');
    }

    const verificationCode = this.generateVerificationCode();
    try {
      await this.sendPasswordChangeEmail(email, verificationCode);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de changement de mot de passe:",
        error,
      );
      throw new InternalServerErrorException(
        "Erreur lors de l'envoi de l'e-mail de changement de mot de passe",
      );
    }

    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
    this.verificationCodes[email] = {
      code: verificationCode,
      expiresAt,
      partenaireDto: signUpPartenaireDto,
    };

    return {
      message:
        'E-mail de changement de mot de passe envoyé à votre adresse e-mail',
    };
  }

  async verifyCodePartenaire(email: string, code: string): Promise<Partenaire> {
    const storedCode = this.verificationCodes[email];

    if (!storedCode) {
      throw new UnauthorizedException(
        'Aucun code de vérification trouvé pour cet email',
      );
    }

    if (new Date() > storedCode.expiresAt) {
      throw new UnauthorizedException('Le code de vérification a expiré');
    }

    if (storedCode.code !== code) {
      throw new UnauthorizedException('Code de vérification incorrect');
    }

    if (!storedCode.partenaireDto) {
      throw new BadRequestException("Données d'inscription manquantes");
    }

    const {
      nom,
      email: partenaireEmail,
      telephone,
      adresse,
      site_web,
      profileId,
    } = storedCode.partenaireDto;

    const existingPartenaire = await this.partenaireRepository.findOneBy({
      email: partenaireEmail,
    });
    if (existingPartenaire) {
      throw new ConflictException('Email déjà utilisé');
    }

    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profil avec l'ID ${profileId} non trouvé`);
    }

    const partenaire = this.partenaireRepository.create({
      nom,
      email: partenaireEmail,
      password: null,
      telephone,
      adresse,
      site_web,
      profile,
    });

    const savedPartenaire = await this.partenaireRepository.save(partenaire);

    delete this.verificationCodes[email];

    return savedPartenaire;
  }

  async changePasswordPartenaire(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    console.log(
      `Tentative de changement de mot de passe pour ${email} avec code ${code}`,
    );
    const storedCode = this.verificationCodes[email];

    if (!storedCode) {
      console.error(`Aucun code trouvé dans verificationCodes pour ${email}`);
      throw new UnauthorizedException(
        'Aucun code de vérification trouvé pour cet email',
      );
    }

    if (new Date() > storedCode.expiresAt) {
      console.error(`Code expiré pour ${email}`);
      throw new UnauthorizedException('Le code de vérification a expiré');
    }

    if (storedCode.code !== code) {
      console.error(
        `Code incorrect pour ${email}. Attendu: ${storedCode.code}, Reçu: ${code}`,
      );
      throw new UnauthorizedException('Code de vérification incorrect');
    }

    if (!storedCode.partenaireDto) {
      console.error(`Données d'inscription manquantes pour ${email}`);
      throw new BadRequestException("Données d'inscription manquantes");
    }

    const {
      nom,
      email: partenaireEmail,
      telephone,
      adresse,
      site_web,
      profileId,
    } = storedCode.partenaireDto;

    const existingPartenaire = await this.partenaireRepository.findOneBy({
      email: partenaireEmail,
    });
    if (existingPartenaire) {
      // console.error(`Email déjà utilisé: ${partenaireEmail}`);
      throw new ConflictException('Email déjà utilisé');
    }

    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) {
      console.error(`Profil non trouvé pour ID ${profileId}`);
      throw new NotFoundException(`Profil avec l'ID ${profileId} non trouvé`);
    }

    let hashedPassword: string;
    try {
      hashedPassword = await this.hasshingService.hash(newPassword);
      // console.log(`Mot de passe haché pour ${email}`);
    } catch (error) {
      // console.error('Erreur lors du hachage du mot de passe:', error);
      throw new InternalServerErrorException(
        'Erreur lors du changement de mot de passe',
      );
    }

    const partenaire = this.partenaireRepository.create({
      nom,
      email: partenaireEmail,
      password: hashedPassword,
      telephone,
      adresse,
      site_web,
      profile,
    });

    const savedPartenaire = await this.partenaireRepository.save(partenaire);
    console.log(`Partenaire créé pour ${email}`);

    delete this.verificationCodes[email];

    return { message: 'Mot de passe changé avec succès et partenaire créé' };
  }

  // async changePasswordPartenaire(
  //   email: string,
  //   code: string,
  //   newPassword: string,
  // ): Promise<{ message: string }> {
  //   const storedCode = this.verificationCodes[email];

  //   if (!storedCode) {
  //     throw new UnauthorizedException(
  //       'Aucun code de vérification trouvé pour cet email',
  //     );
  //   }

  //   if (new Date() > storedCode.expiresAt) {
  //     throw new UnauthorizedException('Le code de vérification a expiré');
  //   }

  //   if (storedCode.code !== code) {
  //     throw new UnauthorizedException('Code de vérification incorrect');
  //   }

  //   const partenaire = await this.partenaireRepository.findOneBy({ email });
  //   if (!partenaire) {
  //     throw new NotFoundException('Partenaire non trouvé');
  //   }

  //   try {
  //     partenaire.password = await this.hasshingService.hash(newPassword);
  //     await this.partenaireRepository.save(partenaire);
  //   } catch (error) {
  //     console.error('Erreur lors du hachage du mot de passe:', error);
  //     throw new InternalServerErrorException(
  //       'Erreur lors du changement de mot de passe',
  //     );
  //   }

  //   delete this.verificationCodes[email];

  //   return { message: 'Mot de passe changé avec succès' };
  // }

  async signInPartenaire(signInDto: SignInDto) {
    const partenaire = await this.partenaireRepository.findOne({
      where: { email: signInDto.email },
      relations: ['profile'],
    });

    if (!partenaire) {
      throw new UnauthorizedException("Le partenaire n'existe pas");
    }

    const isEqual = await this.hasshingService.compare(
      signInDto.password,
      partenaire.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: partenaire.id,
        email: partenaire.email,
        nom: partenaire.nom,
        profile: partenaire.profile,
        type: 'partenaire',
        profile_type: partenaire.profile.nom,
      },
      {
        audience: this.jwtConffigutation.audience,
        issuer: this.jwtConffigutation.issuer,
        secret: this.jwtConffigutation.secret,
        expiresIn: this.jwtConffigutation.accessTokenTtl,
      },
    );

    return {
      accessToken,
    };
  }
}
