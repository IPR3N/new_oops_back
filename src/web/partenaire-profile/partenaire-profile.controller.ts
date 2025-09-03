import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartenaireProfileService } from './partenaire-profile.service';
import { CreatePartenaireProfileDto } from './dto/create-partenaire-profile.dto';
import { UpdatePartenaireProfileDto } from './dto/update-partenaire-profile.dto';
import { AuthType } from 'src/auth/enums/auth.types.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('partenaire-profile')
export class PartenaireProfileController {
  constructor(
    private readonly partenaireProfileService: PartenaireProfileService,
  ) {}

  @Post()
  @Auth(AuthType.None)
  create(@Body() createPartenaireProfileDto: CreatePartenaireProfileDto) {
    return this.partenaireProfileService.create(createPartenaireProfileDto);
  }

  @Get()
  findAll() {
    return this.partenaireProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partenaireProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartenaireProfileDto: UpdatePartenaireProfileDto,
  ) {
    return this.partenaireProfileService.update(
      +id,
      updatePartenaireProfileDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partenaireProfileService.remove(+id);
  }
}
