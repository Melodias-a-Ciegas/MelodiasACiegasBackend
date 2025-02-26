import { Test, TestingModule } from '@nestjs/testing';
import { CancionCalificacionService } from './cancion-calificacion.service';

describe('CancionCalificacionService', () => {
  let service: CancionCalificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancionCalificacionService],
    }).compile();

    service = module.get<CancionCalificacionService>(CancionCalificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
