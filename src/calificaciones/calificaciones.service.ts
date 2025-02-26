// src/calificaciones/calificaciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Calificacion } from './calificacion.entity';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectRepository(Calificacion)
    private calificacionesRepository: Repository<Calificacion>,
  ) {}

  findAll(): Promise<Calificacion[]> {
    return this.calificacionesRepository.find();
  }

  async findOne(id: number): Promise<Calificacion> {
    const calificacion = await this.calificacionesRepository.findOneBy({ id });
    if (!calificacion) {
      throw new Error(`Calificacion with id ${id} not found`);
    }
    return calificacion;
  }

  create(calificacion: Partial<Calificacion>): Promise<Calificacion> {
    const nuevaCalificacion = this.calificacionesRepository.create(calificacion);
    return this.calificacionesRepository.save(nuevaCalificacion);
  }

  async update(id: number, calificacionData: Partial<Calificacion>): Promise<Calificacion> {
    await this.calificacionesRepository.update(id, calificacionData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.calificacionesRepository.delete(id);
  }
}