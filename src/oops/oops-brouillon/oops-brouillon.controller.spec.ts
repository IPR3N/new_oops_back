import { Test, TestingModule } from '@nestjs/testing';
import { OopsBrouillonController } from './oops-brouillon.controller';
import { OopsBrouillonService } from './oops-brouillon.service';

describe('OopsBrouillonController', () => {
  let controller: OopsBrouillonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OopsBrouillonController],
      providers: [OopsBrouillonService],
    }).compile();

    controller = module.get<OopsBrouillonController>(OopsBrouillonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
