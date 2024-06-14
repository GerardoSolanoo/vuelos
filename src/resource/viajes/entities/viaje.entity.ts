import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Estado_Viaje } from '../../../common/enums/estado-viaje.enum';
import { Aeropuerto } from '../../../resource/aeropuertos/entities/aeropuerto.entity';
import { Vuelo } from '../../../resource/vuelos/entities/vuelo.entity';
import { TarifaClaseViajes } from './tarifasclase-viaje.entity';
import { TarifaDistanciaViajes } from './tarifadistancia-viajes.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  Viaje_ID: number;

  @Column({ nullable: true, type: 'timestamptz' })
  fechaSalida: Date | string;

  @Column({ nullable: true, type: 'timestamptz' })
  fechaLlegada: Date | string;

  @Column({ nullable: true, type: 'integer' })
  duracion_vuelo_ms: number;
  @Column({
    type: 'enum',
    enum: Estado_Viaje,
    nullable: false,
    default: Estado_Viaje.POR_INICIAR,
  })
  estadoViaje: Estado_Viaje;

  @ManyToOne(() => Aeropuerto, { nullable: false, eager: true })
  aeropuertoDestino: Aeropuerto;

  @ManyToOne(() => Aeropuerto, { nullable: false, eager: true })
  aeropuertoOrigen: Aeropuerto;

  @ManyToOne(() => Vuelo, { nullable: false, eager: true })
  vueloId: Vuelo;

  @OneToMany(() => TarifaClaseViajes, (m) => m.viaje, { eager: true })
  tarifas_clase: TarifaClaseViajes[];
  @OneToMany(() => TarifaDistanciaViajes, (m) => m.viaje, { eager: true })
  tarifas_distancia: TarifaDistanciaViajes[];

  calculLugaresDisponoibles() {
    return (
      this.vueloId.avion_Id.avion_Capacidad_Pasajeros -
      this.vueloId.pasajerosApartados -
      this.vueloId.pasajerosTotales
    );
  }
}
