import { Test, TestingModule } from '@nestjs/testing';
import { CropVarietyService } from './crop_variety.service';

describe('CropVarietyService', () => {
  let service: CropVarietyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropVarietyService],
    }).compile();

    service = module.get<CropVarietyService>(CropVarietyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
