import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMemberShipDto } from './create-project-member-ship.dto';

export class UpdateProjectMemberShipDto extends PartialType(CreateProjectMemberShipDto) {}
