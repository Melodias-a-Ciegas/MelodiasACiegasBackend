// src/canciones/canciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { Cancion } from './cancion.entity';
import { CancionInfoModule } from 'src/cancion-info/cancion-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cancion]), CancionInfoModule],
  providers: [CancionesService],
  controllers: [CancionesController],
  exports: [CancionesService],
})
export class CancionesModule {}