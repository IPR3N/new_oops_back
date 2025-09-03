import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMessagesController } from './project_messages.controller';
import { ProjectMessagesService } from './project_messages.service';

describe('ProjectMessagesController', () => {
  let controller: ProjectMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMessagesController],
      providers: [ProjectMessagesService],
    }).compile();

    controller = module.get<ProjectMessagesController>(ProjectMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
