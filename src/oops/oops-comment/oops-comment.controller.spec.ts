import { Test, TestingModule } from '@nestjs/testing';
import { OopsCommentController } from './oops-comment.controller';
import { OopsCommentService } from './oops-comment.service';

describe('OopsCommentController', () => {
  let controller: OopsCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OopsCommentController],
      providers: [OopsCommentService],
    }).compile();

    controller = module.get<OopsCommentController>(OopsCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
