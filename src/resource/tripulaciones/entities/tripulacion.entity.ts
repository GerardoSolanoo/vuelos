import { Trabajador } from '../../../resource/trabajadores/entities/trabajador.entity';
import { Vuelo } from '../../../resource/vuelos/entities/vuelo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Tripulacion {
  @PrimaryGeneratedColumn()
  tripulacion_ID: number;

  @Column({ nullable: false, length: 20 })
  tripulacion_NombreEquipo: string;

  @Column({ nullable: false })
  tripulacion_CantidadTripulantes: number;

  @Column({ nullable: false, length: 20 })
  tripulacion_ClaseViaje: string;

  @Column({ nullable: false })
  tripulacion_Valoracion: number;

  @OneToMany(() => Trabajador, (trabajador) => trabajador.tripulacion_ID, {
    cascade: true,
    eager: true,
  })
  trabajadores: Trabajador[];

  @OneToMany(() => Vuelo, (vuelo) => vuelo.tripulacion_ID)
  vuelo_Id: Vuelo;
}
