import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "src/user/enums/role.enum";

export class SignupDto {
    @IsString()
    nom: string;
    @IsString()
    prenom: string;
    @IsEmail()
    email: string;
    @MinLength(6)
    password: string;
}