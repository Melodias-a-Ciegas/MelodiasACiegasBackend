import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('Usuarios')
@Unique(['correo'])
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 255 })
  correo: string;

  @Column({ length: 255 })
  contrasenia: string;
}