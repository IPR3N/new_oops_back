import { Test, TestingModule } from '@nestjs/testing';
import { ProjetRapportService } from './projet-rapport.service';

describe('ProjetRapportService', () => {
  let service: ProjetRapportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetRapportService],
    }).compile();

    service = module.get<ProjetRapportService>(ProjetRapportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
