import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OopsShareService } from './oops-share.service';
import { CreateOopsShareDto } from './dto/create-oops-share.dto';
import { UpdateOopsShareDto } from './dto/update-oops-share.dto';

@Controller('oops-share')
export class OopsShareController {
  constructor(private readonly oopsShareService: OopsShareService) {}

  @Post()
  create(@Body() createOopsShareDto: CreateOopsShareDto) {
    return this.oopsShareService.create(createOopsShareDto);
  }

  @Get()
  findAll() {
    return this.oopsShareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oopsShareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOopsShareDto: UpdateOopsShareDto) {
    return this.oopsShareService.update(+id, updateOopsShareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oopsShareService.remove(+id);
  }
}
