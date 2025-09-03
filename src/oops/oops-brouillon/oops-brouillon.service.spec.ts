import { Test, TestingModule } from '@nestjs/testing';
import { OopsBrouillonService } from './oops-brouillon.service';

describe('OopsBrouillonService', () => {
  let service: OopsBrouillonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OopsBrouillonService],
    }).compile();

    service = module.get<OopsBrouillonService>(OopsBrouillonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
