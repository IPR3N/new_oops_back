import { Test, TestingModule } from '@nestjs/testing';
import { OopsCommentService } from './oops-comment.service';

describe('OopsCommentService', () => {
  let service: OopsCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OopsCommentService],
    }).compile();

    service = module.get<OopsCommentService>(OopsCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
