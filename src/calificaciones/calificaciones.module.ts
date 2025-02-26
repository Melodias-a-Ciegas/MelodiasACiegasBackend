// src/calificaciones/calificaciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { Calificacion } from './calificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calificacion])],
  providers: [CalificacionesService],
  controllers: [CalificacionesController],
  exports: [CalificacionesService],
})
export class CalificacionesModule {}