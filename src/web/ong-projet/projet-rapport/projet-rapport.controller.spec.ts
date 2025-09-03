import { Test, TestingModule } from '@nestjs/testing';
import { ProjetRapportController } from './projet-rapport.controller';
import { ProjetRapportService } from './projet-rapport.service';

describe('ProjetRapportController', () => {
  let controller: ProjetRapportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetRapportController],
      providers: [ProjetRapportService],
    }).compile();

    controller = module.get<ProjetRapportController>(ProjetRapportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
