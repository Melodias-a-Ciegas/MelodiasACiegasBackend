// src/intentos/intentos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Intento } from './intento.entity';

@Injectable()
export class IntentosService {
  constructor(
    @InjectRepository(Intento)
    private intentosRepository: Repository<Intento>,
  ) {}

  findAll(): Promise<Intento[]> {
    return this.intentosRepository.find({
      relations: ['cancion', 'usuario', 'calificacion'],
    });
  }

  async findOne(id: number): Promise<Intento> {
    const intento = await this.intentosRepository.findOne({
      where: { id },
      relations: ['cancion', 'usuario', 'calificacion'],
    });
    if (!intento) {
      throw new Error(`Intento with id ${id} not found`);
    }
    return intento;
  }

  create(intento: Partial<Intento>): Promise<Intento> {
    const nuevoIntento = this.intentosRepository.create(intento);
    return this.intentosRepository.save(nuevoIntento);
  }

  async update(id: number, intentoData: Partial<Intento>): Promise<Intento> {
    await this.intentosRepository.update(id, intentoData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.intentosRepository.delete(id);
  }
}