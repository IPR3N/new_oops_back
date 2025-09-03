import { Test, TestingModule } from '@nestjs/testing';
import { OopsLikeController } from './oops-like.controller';
import { OopsLikeService } from './oops-like.service';

describe('OopsLikeController', () => {
  let controller: OopsLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OopsLikeController],
      providers: [OopsLikeService],
    }).compile();

    controller = module.get<OopsLikeController>(OopsLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
