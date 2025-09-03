import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OopsBrouillonService } from './oops-brouillon.service';
import { CreateOopsBrouillonDto } from './dto/create-oops-brouillon.dto';
import { UpdateOopsBrouillonDto } from './dto/update-oops-brouillon.dto';

@Controller('oops-brouillon')
export class OopsBrouillonController {
  constructor(private readonly oopsBrouillonService: OopsBrouillonService) {}

  @Post()
  create(@Body() createOopsBrouillonDto: CreateOopsBrouillonDto) {
    return this.oopsBrouillonService.create(createOopsBrouillonDto);
  }

  @Get()
  findAll() {
    return this.oopsBrouillonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oopsBrouillonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOopsBrouillonDto: UpdateOopsBrouillonDto) {
    return this.oopsBrouillonService.update(+id, updateOopsBrouillonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oopsBrouillonService.remove(+id);
  }
}
