import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectMessagesService } from './project_messages.service';
import { CreateProjectMessageDto } from './dto/create-project_message.dto';
import { UpdateProjectMessageDto } from './dto/update-project_message.dto';

@Controller('project-messages')
export class ProjectMessagesController {
  constructor(private readonly projectMessagesService: ProjectMessagesService) {}

  @Post()
  create(@Body() createProjectMessageDto: CreateProjectMessageDto) {
    return this.projectMessagesService.create(createProjectMessageDto);
  }

  @Get()
  findAll() {
    return this.projectMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectMessageDto: UpdateProjectMessageDto) {
    return this.projectMessagesService.update(+id, updateProjectMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectMessagesService.remove(+id);
  }
}
