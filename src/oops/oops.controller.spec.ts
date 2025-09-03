import { Test, TestingModule } from '@nestjs/testing';
import { OopsController } from './oops.controller';
import { OopsService } from './oops.service';

describe('OopsController', () => {
  let controller: OopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OopsController],
      providers: [OopsService],
    }).compile();

    controller = module.get<OopsController>(OopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
