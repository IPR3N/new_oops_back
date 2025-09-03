import { Test, TestingModule } from '@nestjs/testing';
import { PartenaireProfileService } from './partenaire-profile.service';

describe('PartenaireProfileService', () => {
  let service: PartenaireProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartenaireProfileService],
    }).compile();

    service = module.get<PartenaireProfileService>(PartenaireProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
