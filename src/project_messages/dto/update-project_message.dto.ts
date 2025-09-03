import { PartialType } from '@nestjs/swagger';
import { CreateProjectMessageDto } from './create-project_message.dto';

export class UpdateProjectMessageDto extends PartialType(CreateProjectMessageDto) {}
