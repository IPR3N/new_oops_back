import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberShipService } from './project-member-ship.service';

describe('ProjectMemberShipService', () => {
  let service: ProjectMemberShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMemberShipService],
    }).compile();

    service = module.get<ProjectMemberShipService>(ProjectMemberShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
