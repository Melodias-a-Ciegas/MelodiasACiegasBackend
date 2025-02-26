import { Test, TestingModule } from '@nestjs/testing';
import { CancionInfoController } from './cancion-info.controller';

describe('CancionInfoController', () => {
  let controller: CancionInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancionInfoController],
    }).compile();

    controller = module.get<CancionInfoController>(CancionInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
