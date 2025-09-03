import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get()
  async getAllRegions() {
    return this.regionService.findAll();
  }

  @Post()
  async createRegion(
    @Body()
    body: {
      nom: string;
      description: string;
      pays: string;
      code: string;
      superficie: number;
      population: number;
      climat: string;
      biodiversite: string;
      environnement: string;
    },
  ) {
    return this.regionService.createRegion(body);
  }

  @Put(':id')
  async updateRegion(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      nom: string;
      description: string;
      pays: string;
      code: string;
      superficie: number;
      population: number;
      climat: string;
      biodiversite: string;
      environnement: string;
    },
  ) {
    return this.regionService.updateRegion(id, body);
  }

  @Delete(':id')
  async deleteRegion(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.deleteRegion(id);
  }
}
