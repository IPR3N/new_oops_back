import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestissementService } from './investissement.service';
import { CreateInvestissementDto } from './dto/create-investissement.dto';
import { UpdateInvestissementDto } from './dto/update-investissement.dto';

@Controller('investissement')
export class InvestissementController {
  constructor(private readonly investissementService: InvestissementService) {}

  @Post()
  create(@Body() createInvestissementDto: CreateInvestissementDto) {
    return this.investissementService.create(createInvestissementDto);
  }

  @Get()
  findAll() {
    return this.investissementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investissementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestissementDto: UpdateInvestissementDto) {
    return this.investissementService.update(+id, updateInvestissementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investissementService.remove(+id);
  }
}
