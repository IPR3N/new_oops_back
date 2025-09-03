import { Test, TestingModule } from '@nestjs/testing';
import { OopsLikeService } from './oops-like.service';

describe('OopsLikeService', () => {
  let service: OopsLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OopsLikeService],
    }).compile();

    service = module.get<OopsLikeService>(OopsLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
