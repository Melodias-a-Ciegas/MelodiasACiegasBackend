// src/intentos/intentos.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { IntentosService } from './intentos.service';
import { Intento } from './intento.entity';

@Controller('intentos')
export class IntentosController {
  constructor(private readonly intentosService: IntentosService) {}

  @Get()
  findAll(): Promise<Intento[]> {
    return this.intentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Intento> {
    return this.intentosService.findOne(+id);
  }

  @Post()
  create(@Body() intentoData: Partial<Intento>): Promise<Intento> {
    return this.intentosService.create(intentoData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() intentoData: Partial<Intento>): Promise<Intento> {
    return this.intentosService.update(+id, intentoData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.intentosService.remove(+id);
  }
}