import { Test, TestingModule } from '@nestjs/testing';
import { OngProjetService } from './ong-projet.service';

describe('OngProjetService', () => {
  let service: OngProjetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OngProjetService],
    }).compile();

    service = module.get<OngProjetService>(OngProjetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
