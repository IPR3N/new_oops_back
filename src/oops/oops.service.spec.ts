import { Test, TestingModule } from '@nestjs/testing';
import { OopsService } from './oops.service';

describe('OopsService', () => {
  let service: OopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OopsService],
    }).compile();

    service = module.get<OopsService>(OopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
