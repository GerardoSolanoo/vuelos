import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Estado_Viaje } from 'src/common/enums/estado-viaje.enum';
import { Aeropuerto } from 'src/resource/aeropuertos/entities/aeropuerto.entity';
import { Avion } from 'src/resource/aviones/entities/avion.entity';
import { Vuelo } from 'src/resource/vuelos/entities/vuelo.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  Viaje_ID: number;

  @Column({ nullable: false, type: 'date' })
  fechaSalida: Date;

  @Column({ nullable: false, type: 'date' })
  fechaLlegada: Date;

  @Column({
    type: 'enum',
    enum: Estado_Viaje,
    nullable: false,
    default: Estado_Viaje.POR_INICIAR,
  })
  estadoViaje: Estado_Viaje;

  @ManyToOne(() => Avion, { nullable: false })
  numeroAvion: Avion;

  @ManyToOne(() => Aeropuerto, { nullable: false })
  aeropuertoDestino: Aeropuerto;

  @ManyToOne(() => Aeropuerto, { nullable: false })
  aeropuertoOrigen: Aeropuerto;

  @ManyToOne(() => Vuelo, { nullable: false })
  vueloId: Vuelo;
}
