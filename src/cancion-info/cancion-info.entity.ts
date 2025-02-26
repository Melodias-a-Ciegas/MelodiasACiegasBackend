import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cancion } from 'src/canciones/cancion.entity';

@Entity()
export class CancionInfo {
  @PrimaryGeneratedColumn()
  id_cancion_info: number;

  @ManyToOne(() => Cancion, { onDelete: 'CASCADE' })
  id_cancion: Cancion;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 500, nullable: true })
  compositor: string;

  @Column({ nullable: true, type: 'int' })
  numero_total_notas: number;

  @Column({ nullable: true, type: 'float' })
  densidad_notas: number;

  @Column({ nullable: true, type: 'int' })
  cantidad_saltos_grandes: number;

  @Column({ nullable: true, type: 'int' })
  notas_mano_izquierda: number;

  @Column({ nullable: true, type: 'int' })
  notas_mano_derecha: number;

  @Column({ nullable: true, type: 'int' })
  tuplets: number;
}
