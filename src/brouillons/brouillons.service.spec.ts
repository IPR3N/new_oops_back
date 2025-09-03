import { Test, TestingModule } from '@nestjs/testing';
import { BrouillonsService } from './brouillons.service';

describe('BrouillonsService', () => {
  let service: BrouillonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrouillonsService],
    }).compile();

    service = module.get<BrouillonsService>(BrouillonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
