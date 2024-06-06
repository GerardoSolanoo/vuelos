import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tripulacion } from '../../tripulaciones/entities/tripulacion.entity';

@Entity()
export class Trabajador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  trabajador_Nombre: string;

  @Column({ nullable: false, length: 30 })
  trabajador_Apellidos: string;

  @Column({ nullable: false, length: 20 })
  trabajador_Telefono: string;

  @Column({ nullable: false })
  trabajador_CorreoElectronico: string;

  @Column({ nullable: false, type: 'date' })
  trabajador_FechaNacimiento: Date;

  @Column({ nullable: false, length: 30 })
  trabajador_Nacionalidad: string;

  @Column({ nullable: false })
  trabajador_HorasVuelo: number;

  @ManyToOne(() => Tripulacion, (tripulacion) => tripulacion.trabajadores)
  @JoinColumn({ name: 'tripulacion_ID' })
  tripulacion_ID: Tripulacion;
}
