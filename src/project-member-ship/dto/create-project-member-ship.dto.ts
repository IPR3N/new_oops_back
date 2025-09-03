import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateProjectMemberShipDto {
  id: number;
  user: number;
  project: number;
  role: string;
}
