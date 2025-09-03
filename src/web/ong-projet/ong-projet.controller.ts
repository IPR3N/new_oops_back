import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OngProjetService } from './ong-projet.service';
import { CreateOngProjetDto } from './dto/create-ong-projet.dto';
import { UpdateOngProjetDto } from './dto/update-ong-projet.dto';

@Controller('ong-projet')
export class OngProjetController {
  constructor(private readonly ongProjetService: OngProjetService) {}

  @Post()
  create(@Body() createOngProjetDto: CreateOngProjetDto) {
    return this.ongProjetService.create(createOngProjetDto);
  }

  @Get('by-ong/:ongId')
  findAllByOngId(@Param('ongId') ongId: number) {
    return this.ongProjetService.findAllByPartenairId(ongId);
  }

  @Get()
  findAll() {
    return this.ongProjetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ongProjetService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOngProjetDto: UpdateOngProjetDto,
  ) {
    return this.ongProjetService.update(+id, updateOngProjetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ongProjetService.remove(+id);
  }

  @Post(':id/beneficiaires')
  addBeneficiaires(
    @Param('id') id: string,
    @Body('beneficiaireIds') beneficiaireIds: number[],
  ) {
    return this.ongProjetService.addBeneficiaires(+id, beneficiaireIds);
  }
}
