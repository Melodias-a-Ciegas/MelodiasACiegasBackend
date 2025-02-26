// src/intentos/intentos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentosService } from './intentos.service';
import { IntentosController } from './intentos.controller';
import { Intento } from './intento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intento])],
  providers: [IntentosService],
  controllers: [IntentosController],
  exports: [IntentosService],
})
export class IntentosModule {}