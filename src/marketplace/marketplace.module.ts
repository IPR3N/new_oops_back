import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marketplace } from './entities/marketplace.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Marketplace,
        Project,
      ]
    )
  ],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
})
export class MarketplaceModule { }
