import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMediaController } from './project-media.controller';
import { ProjectMediaService } from './project-media.service';

describe('ProjectMediaController', () => {
  let controller: ProjectMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMediaController],
      providers: [ProjectMediaService],
    }).compile();

    controller = module.get<ProjectMediaController>(ProjectMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
