// src/cancion-calificacion/cancion-calificacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CancionCalificacion } from './cancion-calificacion.entity';

@Injectable()
export class CancionCalificacionService {
  constructor(
    @InjectRepository(CancionCalificacion)
    private cancionCalificacionRepository: Repository<CancionCalificacion>,
  ) {}

  findAll(): Promise<CancionCalificacion[]> {
    return this.cancionCalificacionRepository.find({
      relations: ['cancion', 'calificacion'],
    });
  }

  async findOne(id_cancion: number, id_calificacion: number): Promise<CancionCalificacion> {
    const result = await this.cancionCalificacionRepository.findOne({
      where: {
        id_cancion,
        id_calificacion,
      },
      relations: ['cancion', 'calificacion'],
    });
    if (!result) {
      throw new Error('CancionCalificacion not found');
    }
    return result;
  }

  create(relacion: Partial<CancionCalificacion>): Promise<CancionCalificacion> {
    const nuevaRelacion = this.cancionCalificacionRepository.create(relacion);
    return this.cancionCalificacionRepository.save(nuevaRelacion);
  }

  async remove(id_cancion: number, id_calificacion: number): Promise<void> {
    await this.cancionCalificacionRepository.delete({ id_cancion, id_calificacion });
  }
}