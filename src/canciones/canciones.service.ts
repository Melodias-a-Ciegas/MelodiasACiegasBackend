// src/canciones/canciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cancion } from './cancion.entity';

@Injectable()
export class CancionesService {
  constructor(
    @InjectRepository(Cancion)
    private cancionesRepository: Repository<Cancion>,
  ) {}

  findAll(): Promise<Cancion[]> {
    return this.cancionesRepository.find();
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOneBy({ id });
    if (!cancion) {
      throw new Error(`Cancion with id ${id} not found`);
    }
    return cancion;
  }

  create(cancion: Partial<Cancion>): Promise<Cancion> {
    const nuevaCancion = this.cancionesRepository.create(cancion);
    return this.cancionesRepository.save(nuevaCancion);
  }

  async update(id: number, cancionData: Partial<Cancion>): Promise<Cancion> {
    await this.cancionesRepository.update(id, cancionData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cancionesRepository.delete(id);
  }
}