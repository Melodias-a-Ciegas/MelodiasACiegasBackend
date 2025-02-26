// src/cancion-calificacion/cancion-calificacion.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CancionCalificacionService } from './cancion-calificacion.service';
import { CancionCalificacion } from './cancion-calificacion.entity';

@Controller('cancion-calificacion')
export class CancionCalificacionController {
  constructor(private readonly cancionCalificacionService: CancionCalificacionService) {}

  @Get()
  findAll(): Promise<CancionCalificacion[]> {
    return this.cancionCalificacionService.findAll();
  }

  @Get(':id_cancion/:id_calificacion')
  findOne(
    @Param('id_cancion') id_cancion: string,
    @Param('id_calificacion') id_calificacion: string,
  ): Promise<CancionCalificacion> {
    return this.cancionCalificacionService.findOne(+id_cancion, +id_calificacion);
  }

  @Post()
  create(@Body() relacionData: Partial<CancionCalificacion>): Promise<CancionCalificacion> {
    return this.cancionCalificacionService.create(relacionData);
  }

  @Delete(':id_cancion/:id_calificacion')
  remove(
    @Param('id_cancion') id_cancion: string,
    @Param('id_calificacion') id_calificacion: string,
  ): Promise<void> {
    return this.cancionCalificacionService.remove(+id_cancion, +id_calificacion);
  }
}