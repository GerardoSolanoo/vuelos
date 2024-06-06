import { Ubicacion } from '../../../resource/ubicaciones/entities/ubicacion.entity';
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
export class TarifaDistancia {
  @PrimaryGeneratedColumn()
  tarifa_distancia_Id: number;

  @Column({ nullable: false, length: 30 })
  tarifa_Distancia_Nombre: string;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.tarifaDistanciaOrigen)
  @JoinColumn({ name: 'origen_id' })
  origenId: number;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.tarifaDistanciaDestino)
  @JoinColumn({ name: 'destino_id' })
  destinoId: number;

  @Column()
  distancia: number;

  @Column()
  tarifa_Distancia_Estado: string;

  @Column()
  precioTarifa: number;

  @OneToMany(() => Vuelo, (vuelo) => vuelo.tarifa_distancia_Id)
  vuelo_Id: Vuelo;
}
