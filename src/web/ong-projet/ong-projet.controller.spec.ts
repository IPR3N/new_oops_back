import { Test, TestingModule } from '@nestjs/testing';
import { OngProjetController } from './ong-projet.controller';
import { OngProjetService } from './ong-projet.service';

describe('OngProjetController', () => {
  let controller: OngProjetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OngProjetController],
      providers: [OngProjetService],
    }).compile();

    controller = module.get<OngProjetController>(OngProjetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
