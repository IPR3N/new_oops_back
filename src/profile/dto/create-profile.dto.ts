import { User } from 'src/user/entities/user.entity';

export class CreateProfileDto {
  id: number;
  bio: string;
  photoProfile: string;
  photoCouverture: string;
  location?: string;
  username: string;
  dob: string;
  user: number;
}
