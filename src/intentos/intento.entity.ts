import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from 'typeorm';
import { Cancion } from '../canciones/cancion.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Calificacion } from '../calificaciones/calificacion.entity';

@Entity('Intentos')
export class Intento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_cancion: number;

  @Column()
  id_usuario: number;

  @Column()
  id_calificacion: number;

  @Column({ nullable: true })
  notas_correctas_max: number;

  @Column({ nullable: true })
  notas_incorrectas_max: number;

  @Column('float', { nullable: true })
  porcentaje_aciertos: number;

  @Column('float', { nullable: true })
  porcentaje_error: number;

  @Column('float', { nullable: true })
  porcentaje_completado: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: string;

  @ManyToOne(() => Cancion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cancion' })
  cancion: Cancion;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Calificacion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_calificacion' })
  calificacion: Calificacion;
}