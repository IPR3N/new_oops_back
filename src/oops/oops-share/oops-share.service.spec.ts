import { Test, TestingModule } from '@nestjs/testing';
import { OopsShareService } from './oops-share.service';

describe('OopsShareService', () => {
  let service: OopsShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OopsShareService],
    }).compile();

    service = module.get<OopsShareService>(OopsShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
