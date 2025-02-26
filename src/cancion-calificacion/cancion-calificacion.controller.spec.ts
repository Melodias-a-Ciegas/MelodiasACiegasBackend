import { Test, TestingModule } from '@nestjs/testing';
import { CancionCalificacionController } from './cancion-calificacion.controller';

describe('CancionCalificacionController', () => {
  let controller: CancionCalificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancionCalificacionController],
    }).compile();

    controller = module.get<CancionCalificacionController>(CancionCalificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
