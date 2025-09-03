import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerNeedService } from './seller-need.service';
import { CreateSellerNeedDto } from './dto/create-seller-need.dto';
import { UpdateSellerNeedDto } from './dto/update-seller-need.dto';

@Controller('seller-need')
export class SellerNeedController {
  constructor(private readonly sellerNeedService: SellerNeedService) {}

  @Post()
  create(@Body() createSellerNeedDto: CreateSellerNeedDto) {
    return this.sellerNeedService.create(createSellerNeedDto);
  }

  @Get()
  findAll() {
    return this.sellerNeedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerNeedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerNeedDto: UpdateSellerNeedDto) {
    return this.sellerNeedService.update(+id, updateSellerNeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerNeedService.remove(+id);
  }
}
