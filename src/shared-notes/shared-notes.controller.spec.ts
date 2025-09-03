import { Test, TestingModule } from '@nestjs/testing';
import { SharedNotesController } from './shared-notes.controller';
import { SharedNotesService } from './shared-notes.service';

describe('SharedNotesController', () => {
  let controller: SharedNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedNotesController],
      providers: [SharedNotesService],
    }).compile();

    controller = module.get<SharedNotesController>(SharedNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
