import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Estado_Logico } from '../../../common/enums/estado_logico.enum';

@Entity()
export class TarifaClase {
  @PrimaryGeneratedColumn()
  tarifa_Clase_Id: number;

  @Column({ length: 30, nullable: false })
  tarifa_Clase_Nombre: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Estado_Logico,
    default: Estado_Logico.ACTIVO,
  })
  tarifa_Clase_Estado: Estado_Logico;

  @Column({ nullable: false })
  precioTarifa: number;
}
