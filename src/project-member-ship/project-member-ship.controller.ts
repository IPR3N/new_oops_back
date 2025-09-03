import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectMemberShipService } from './project-member-ship.service';
import { CreateProjectMemberShipDto } from './dto/create-project-member-ship.dto';
import { UpdateProjectMemberShipDto } from './dto/update-project-member-ship.dto';

@Controller('project-member-ship')
export class ProjectMemberShipController {
  constructor(
    private readonly projectMemberShipService: ProjectMemberShipService,
  ) {}

  @Post()
  create(@Body() createProjectMemberShipDto: CreateProjectMemberShipDto) {
    return this.projectMemberShipService.addColoborateur(
      createProjectMemberShipDto,
    );
  }

  @Get()
  findAll() {
    return this.projectMemberShipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectMemberShipService.findOne(+id);
  }

  @Get('project/:id')
  findOneByProject(@Param('id') id: number) {
    return this.projectMemberShipService.findOneByProject(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectMemberShipDto: UpdateProjectMemberShipDto,
  ) {
    return this.projectMemberShipService.update(
      +id,
      updateProjectMemberShipDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectMemberShipService.remove(+id);
  }
}
