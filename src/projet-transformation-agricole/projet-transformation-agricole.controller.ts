import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjetTransformationAgricoleService } from './projet-transformation-agricole.service';
import { CreateProjetTransformationAgricoleDto } from './dto/create-projet-transformation-agricole.dto';
import { UpdateProjetTransformationAgricoleDto } from './dto/update-projet-transformation-agricole.dto';

@Controller('projet-transformation-agricole')
export class ProjetTransformationAgricoleController {
  constructor(private readonly projetTransformationAgricoleService: ProjetTransformationAgricoleService) {}

  @Post()
  create(@Body() createProjetTransformationAgricoleDto: CreateProjetTransformationAgricoleDto) {
    return this.projetTransformationAgricoleService.create(createProjetTransformationAgricoleDto);
  }

  @Get()
  findAll() {
    return this.projetTransformationAgricoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetTransformationAgricoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetTransformationAgricoleDto: UpdateProjetTransformationAgricoleDto) {
    return this.projetTransformationAgricoleService.update(+id, updateProjetTransformationAgricoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetTransformationAgricoleService.remove(+id);
  }
}
