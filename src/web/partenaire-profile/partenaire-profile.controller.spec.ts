import { Test, TestingModule } from '@nestjs/testing';
import { PartenaireProfileController } from './partenaire-profile.controller';
import { PartenaireProfileService } from './partenaire-profile.service';

describe('PartenaireProfileController', () => {
  let controller: PartenaireProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartenaireProfileController],
      providers: [PartenaireProfileService],
    }).compile();

    controller = module.get<PartenaireProfileController>(PartenaireProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
