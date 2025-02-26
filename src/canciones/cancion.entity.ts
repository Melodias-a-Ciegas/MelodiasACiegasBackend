import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cancion')
export class Cancion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 500 })
  compositor: string;

  @Column({ type: 'bytea' })
  archivo: Buffer;

  @Column({ length: 999999, nullable: true })
  imagen: string;
}