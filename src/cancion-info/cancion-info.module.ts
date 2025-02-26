import { Module } from '@nestjs/common';
import { CancionInfoService } from './cancion-info.service';
import { CancionInfoController } from './cancion-info.controller';

import { CancionInfo } from './cancion-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CancionInfo])],
  providers: [CancionInfoService],
  controllers: [CancionInfoController],
  exports: [CancionInfoService],
})
export class CancionInfoModule {}
