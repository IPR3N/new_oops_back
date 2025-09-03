import { Test, TestingModule } from '@nestjs/testing';
import { CropVarietyController } from './crop_variety.controller';
import { CropVarietyService } from './crop_variety.service';

describe('CropVarietyController', () => {
  let controller: CropVarietyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropVarietyController],
      providers: [CropVarietyService],
    }).compile();

    controller = module.get<CropVarietyController>(CropVarietyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
