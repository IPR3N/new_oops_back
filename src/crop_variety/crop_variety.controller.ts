import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CropVarietyService } from './crop_variety.service';
import { CreateCropVarietyDto } from './dto/create-crop_variety.dto';
import { UpdateCropVarietyDto } from './dto/update-crop_variety.dto';

@Controller('crop-variety')
export class CropVarietyController {
  constructor(private readonly cropVarietyService: CropVarietyService) {}

  @Post()
  create(@Body() createCropVarietyDto: CreateCropVarietyDto) {
    return this.cropVarietyService.create(createCropVarietyDto);
  }

  @Get()
  findAll() {
    return this.cropVarietyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropVarietyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCropVarietyDto: UpdateCropVarietyDto) {
    return this.cropVarietyService.update(+id, updateCropVarietyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropVarietyService.remove(+id);
  }
}
