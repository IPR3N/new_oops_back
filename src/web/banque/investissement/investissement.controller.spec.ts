import { Test, TestingModule } from '@nestjs/testing';
import { InvestissementController } from './investissement.controller';
import { InvestissementService } from './investissement.service';

describe('InvestissementController', () => {
  let controller: InvestissementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestissementController],
      providers: [InvestissementService],
    }).compile();

    controller = module.get<InvestissementController>(InvestissementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
