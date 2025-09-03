import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMessagesService } from './project_messages.service';

describe('ProjectMessagesService', () => {
  let service: ProjectMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMessagesService],
    }).compile();

    service = module.get<ProjectMessagesService>(ProjectMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
