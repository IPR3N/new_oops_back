import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjetRapportService } from './projet-rapport.service';
import { CreateProjetRapportDto } from './dto/create-projet-rapport.dto';
import { UpdateProjetRapportDto } from './dto/update-projet-rapport.dto';

@Controller('projet-rapport')
export class ProjetRapportController {
  constructor(private readonly projetRapportService: ProjetRapportService) {}

  @Get('by-partenaire/:partenaireId')
  findByPartenaire(@Param('partenaireId', ParseIntPipe) partenaireId: number) {
    return this.projetRapportService.findByPartenaire(partenaireId);
  }

  @Post('projet/:projetId')
  async createRapport(
    @Param('projetId', ParseIntPipe) projetId: number,
    @Body() body: { titre: string; contenu: string },
  ) {
    return this.projetRapportService.createRapport(
      projetId,
      body.titre,
      body.contenu,
    );
  }

  @Get('projet/:projetId')
  async getRapportsByProjet(@Param('projetId', ParseIntPipe) projetId: number) {
    return this.projetRapportService.getRapportsByProjet(projetId);
  }
}
