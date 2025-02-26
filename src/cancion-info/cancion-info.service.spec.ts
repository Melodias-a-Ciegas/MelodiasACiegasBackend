import { Test, TestingModule } from '@nestjs/testing';
import { CancionInfoService } from './cancion-info.service';

describe('CancionInfoService', () => {
  let service: CancionInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancionInfoService],
    }).compile();

    service = module.get<CancionInfoService>(CancionInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
