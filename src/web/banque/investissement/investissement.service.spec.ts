import { Test, TestingModule } from '@nestjs/testing';
import { InvestissementService } from './investissement.service';

describe('InvestissementService', () => {
  let service: InvestissementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestissementService],
    }).compile();

    service = module.get<InvestissementService>(InvestissementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
