import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tarjeta_Estado } from '../../../common/enums/tarjeta.enum';

@Entity()
export class Tarjeta {
  @PrimaryGeneratedColumn()
  id_Tarjeta: number;

  @Column({ nullable: false })
  tarjeta_Titular: string;

  @Column({ nullable: false })
  tarjeta_Direccion: string;

  @Column({ nullable: false })
  tarjeta_Numero_Tarjeta: string;

  @Column({ nullable: false })
  tarjeta_Fecha_Vencimiento: string;

  @Column({ nullable: false })
  tarjeta_CVV: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Tarjeta_Estado,
    default: Tarjeta_Estado.ACTIVO,
  })
  tarjeta_Status: string;
}
