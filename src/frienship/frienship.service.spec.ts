import { Test, TestingModule } from '@nestjs/testing';
import { FrienshipService } from './frienship.service';

describe('FrienshipService', () => {
  let service: FrienshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrienshipService],
    }).compile();

    service = module.get<FrienshipService>(FrienshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
