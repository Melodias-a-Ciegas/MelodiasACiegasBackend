import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

@Entity('Calificacion')
export class Calificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dificultad: number;
}