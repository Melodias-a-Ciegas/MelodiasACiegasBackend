import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cancion } from '../canciones/cancion.entity';
import { Calificacion } from '../calificaciones/calificacion.entity';

@Entity('Cancion_Calificacion')
export class CancionCalificacion {
  @PrimaryColumn()
  id_cancion: number;

  @PrimaryColumn()
  id_calificacion: number;

  @ManyToOne(() => Cancion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_cancion' })
  cancion: Cancion;

  @ManyToOne(() => Calificacion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_calificacion' })
  calificacion: Calificacion;
}