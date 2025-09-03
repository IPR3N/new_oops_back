import { Module } from '@nestjs/common';
import { SellerNeedService } from './seller-need.service';
import { SellerNeedController } from './seller-need.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerNeed } from './entities/seller-need.entity';
import { Crop } from 'src/crop/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerNeed, Crop])],
  controllers: [SellerNeedController],
  providers: [SellerNeedService],
})
export class SellerNeedModule {}
