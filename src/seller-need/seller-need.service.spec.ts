import { Test, TestingModule } from '@nestjs/testing';
import { SellerNeedService } from './seller-need.service';

describe('SellerNeedService', () => {
  let service: SellerNeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerNeedService],
    }).compile();

    service = module.get<SellerNeedService>(SellerNeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
