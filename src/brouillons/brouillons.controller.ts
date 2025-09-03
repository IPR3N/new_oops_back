import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrouillonsService } from './brouillons.service';
import { CreateBrouillonDto } from './dto/create-brouillon.dto';
import { UpdateBrouillonDto } from './dto/update-brouillon.dto';

@Controller('brouillons')
export class BrouillonsController {
  constructor(private readonly brouillonsService: BrouillonsService) {}

  @Post()
  create(@Body() createBrouillonDto: CreateBrouillonDto) {
    return this.brouillonsService.create(createBrouillonDto);
  }

  @Get()
  findAll() {
    return this.brouillonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brouillonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrouillonDto: UpdateBrouillonDto) {
    return this.brouillonsService.update(+id, updateBrouillonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brouillonsService.remove(+id);
  }
}
