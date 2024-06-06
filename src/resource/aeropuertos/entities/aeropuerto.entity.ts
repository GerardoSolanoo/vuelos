import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ubicacion } from '../../ubicaciones/entities/ubicacion.entity';
import { TipoAeropuerto } from '../../../common/enums/tipo_aeropuerto.enum';

@Entity()
export class Aeropuerto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  aeropuerto_Nombre: string;

  @Column({ nullable: false, default: TipoAeropuerto.NACIONAL })
  aeropuerto_Tipo: TipoAeropuerto;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.aeropuertosId)
  @JoinColumn({ name: 'ubicacion_id' })
  aeropuerto_Ubicacion: number;
}
