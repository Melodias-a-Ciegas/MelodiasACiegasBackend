import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CancionInfo } from './cancion-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancionInfoService {
  constructor(
    @InjectRepository(CancionInfo)
    private readonly cancionInfoRepository: Repository<CancionInfo>,
  ) {}

  async findAll(): Promise<CancionInfo[]> {
    return this.cancionInfoRepository.find();
  }

  async create(cancionInfo: Partial<CancionInfo>) {
    return this.cancionInfoRepository.save(cancionInfo);
  }
}