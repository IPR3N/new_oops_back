import { Test, TestingModule } from '@nestjs/testing';
import { SharedNotesService } from './shared-notes.service';

describe('SharedNotesService', () => {
  let service: SharedNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedNotesService],
    }).compile();

    service = module.get<SharedNotesService>(SharedNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
