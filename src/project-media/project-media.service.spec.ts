import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMediaService } from './project-media.service';

describe('ProjectMediaService', () => {
  let service: ProjectMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMediaService],
    }).compile();

    service = module.get<ProjectMediaService>(ProjectMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
