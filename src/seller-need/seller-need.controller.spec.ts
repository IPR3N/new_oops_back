import { Test, TestingModule } from '@nestjs/testing';
import { SellerNeedController } from './seller-need.controller';
import { SellerNeedService } from './seller-need.service';

describe('SellerNeedController', () => {
  let controller: SellerNeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerNeedController],
      providers: [SellerNeedService],
    }).compile();

    controller = module.get<SellerNeedController>(SellerNeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
