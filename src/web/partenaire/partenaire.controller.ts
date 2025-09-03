import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartenaireService } from './partenaire.service';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { AuthType } from 'src/auth/enums/auth.types.enum';

@Controller('partenaire')
export class PartenaireController {
  constructor(private readonly partenaireService: PartenaireService) {}

  @Post()
  @Auth(AuthType.None)
  create(@Body() createPartenaireDto: CreatePartenaireDto) {
    return this.partenaireService.create(createPartenaireDto);
  }

  @Get()
  findAll() {
    return this.partenaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partenaireService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartenaireDto: UpdatePartenaireDto,
  ) {
    return this.partenaireService.update(+id, updatePartenaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partenaireService.remove(+id);
  }
}
