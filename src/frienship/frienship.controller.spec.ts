import { Test, TestingModule } from '@nestjs/testing';
import { FrienshipController } from './frienship.controller';
import { FrienshipService } from './frienship.service';

describe('FrienshipController', () => {
  let controller: FrienshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrienshipController],
      providers: [FrienshipService],
    }).compile();

    controller = module.get<FrienshipController>(FrienshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
