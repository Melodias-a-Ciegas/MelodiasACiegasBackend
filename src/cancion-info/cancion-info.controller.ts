import { Body, Controller, Get, Post } from '@nestjs/common';
import { CancionInfo } from './cancion-info.entity';
import { CancionInfoService } from './cancion-info.service';

@Controller('cancion-info')
export class CancionInfoController {
  constructor(private readonly cancionInfoService: CancionInfoService) {}

  @Get()
  async getAll(): Promise<CancionInfo[]> {
    return this.cancionInfoService.findAll();
  }

  @Post()
  async create(@Body() cancionInfo: CancionInfo): Promise<CancionInfo> {
    return this.cancionInfoService.create(cancionInfo);
  }
}
