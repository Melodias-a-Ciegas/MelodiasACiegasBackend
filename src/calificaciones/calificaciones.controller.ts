// src/calificaciones/calificaciones.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { Calificacion } from './calificacion.entity';

@Controller('calificaciones')
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Get()
  findAll(): Promise<Calificacion[]> {
    return this.calificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Calificacion> {
    return this.calificacionesService.findOne(+id);
  }

  @Post()
  create(@Body() calificacionData: Partial<Calificacion>): Promise<Calificacion> {
    return this.calificacionesService.create(calificacionData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() calificacionData: Partial<Calificacion>): Promise<Calificacion> {
    return this.calificacionesService.update(+id, calificacionData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.calificacionesService.remove(+id);
  }
}