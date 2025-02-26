// src/cancion-calificacion/cancion-calificacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionCalificacionService } from './cancion-calificacion.service';
import { CancionCalificacionController } from './cancion-calificacion.controller';
import { CancionCalificacion } from './cancion-calificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CancionCalificacion])],
  providers: [CancionCalificacionService],
  controllers: [CancionCalificacionController],
  exports: [CancionCalificacionService],
})
export class CancionCalificacionModule {}