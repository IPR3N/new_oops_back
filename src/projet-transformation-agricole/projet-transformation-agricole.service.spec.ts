import { Test, TestingModule } from '@nestjs/testing';
import { ProjetTransformationAgricoleService } from './projet-transformation-agricole.service';

describe('ProjetTransformationAgricoleService', () => {
  let service: ProjetTransformationAgricoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetTransformationAgricoleService],
    }).compile();

    service = module.get<ProjetTransformationAgricoleService>(ProjetTransformationAgricoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
