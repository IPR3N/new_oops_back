import { Test, TestingModule } from '@nestjs/testing';
import { ProjetTransformationAgricoleController } from './projet-transformation-agricole.controller';
import { ProjetTransformationAgricoleService } from './projet-transformation-agricole.service';

describe('ProjetTransformationAgricoleController', () => {
  let controller: ProjetTransformationAgricoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetTransformationAgricoleController],
      providers: [ProjetTransformationAgricoleService],
    }).compile();

    controller = module.get<ProjetTransformationAgricoleController>(ProjetTransformationAgricoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
