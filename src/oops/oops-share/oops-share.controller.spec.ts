import { Test, TestingModule } from '@nestjs/testing';
import { OopsShareController } from './oops-share.controller';
import { OopsShareService } from './oops-share.service';

describe('OopsShareController', () => {
  let controller: OopsShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OopsShareController],
      providers: [OopsShareService],
    }).compile();

    controller = module.get<OopsShareController>(OopsShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
