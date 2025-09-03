import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberShipController } from './project-member-ship.controller';
import { ProjectMemberShipService } from './project-member-ship.service';

describe('ProjectMemberShipController', () => {
  let controller: ProjectMemberShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMemberShipController],
      providers: [ProjectMemberShipService],
    }).compile();

    controller = module.get<ProjectMemberShipController>(ProjectMemberShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
