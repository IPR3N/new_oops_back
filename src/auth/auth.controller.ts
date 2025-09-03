import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth.types.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Roles } from './authorization/role.decorators';
import { Role } from 'src/user/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { RestaurePasswordDto } from './dto/restaure-password.dto';
import { SignUpPartenaireDto } from './dto/sign-up-partenaire.dto';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth(AuthType.None)
  @Post('partenaire/change-password')
  async changePasswordPartenaire(
    @Body() body: { email: string; code: string; newPassword: string },
  ) {
    return this.authService.changePasswordPartenaire(
      body.email,
      body.code,
      body.newPassword,
    );
  }

  @Auth(AuthType.None)
  @Post('signup-partenaire')
  async signUpPartenaire(@Body() signUpPartenaireDto: SignUpPartenaireDto) {
    return this.authService.signUpPartenaire(signUpPartenaireDto);
  }

  @Auth(AuthType.None)
  @Post('signin-partenaire')
  async signInPartenaire(@Body() signInDto: SignInDto) {
    return this.authService.signInPartenaire(signInDto);
  }

  @Auth(AuthType.None)
  // @Roles(Role.Admin)
  @Post('sign-up')
  signup(@Body() signUpDto: SignupDto) {
    return this.authService.signUp(signUpDto);
  }

  @Auth(AuthType.None)
  @Post('verify-code')
  async verifyCode(
    @Body('email') email: string,
    @Body('code') code: string,
    @Body() signUpDto: SignupDto,
  ) {
    return this.authService.verifyCode(email, code, signUpDto);
  }

  @Auth(AuthType.None)
  @Post('regenerate-code')
  async regenerateCode(@Body('email') email: string) {
    return this.authService.regenerateVerificationCode(email);
  }

  @Auth(AuthType.None)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Auth(AuthType.Bearer)
  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Auth(AuthType.None)
  @Post('check-mail')
  async checkMail(@Body('email') email: string) {
    return this.authService.verfiUserByEmailAndSendEmail(email);
  }

  @Auth(AuthType.None)
  @Post('verify-email-and-code')
  resetPassword(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.verifyCodeForRestaurePassword(email, code);
  }

  @Auth(AuthType.None)
  @Post('reset-password')
  forgotPassword(@Body() restaurePasswordDto: RestaurePasswordDto) {
    return this.authService.restaurePassword(restaurePasswordDto);
  }

  // @Auth(AuthType.Bearer)
}
