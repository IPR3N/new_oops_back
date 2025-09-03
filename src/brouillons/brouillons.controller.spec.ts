import { Test, TestingModule } from '@nestjs/testing';
import { BrouillonsController } from './brouillons.controller';
import { BrouillonsService } from './brouillons.service';

describe('BrouillonsController', () => {
  let controller: BrouillonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrouillonsController],
      providers: [BrouillonsService],
    }).compile();

    controller = module.get<BrouillonsController>(BrouillonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
