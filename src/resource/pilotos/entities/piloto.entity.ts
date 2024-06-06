import { Estado_Logico } from '../../../common/enums/estado_logico.enum';
import { Vuelo } from '../../../resource/vuelos/entities/vuelo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Piloto {
  @PrimaryGeneratedColumn()
  piloto_Id: number;

  @Column({ nullable: false, length: 30 })
  piloto_Nombre: string;

  @Column({ nullable: false, length: 30 })
  piloto_Apellidos: string;

  @Column({ nullable: false })
  piloto_Telefono: string;

  @Column({ nullable: false, length: 30 })
  piloto_Correo_Electronico: string;

  @Column({ nullable: false, length: 30 })
  piloto_Licencia_Piloto: string;

  @Column({ nullable: false, type: 'date' })
  piloto_Fecha_Nacimiento: Date;

  @Column({ nullable: false, length: 30 })
  piloto_Nacionalidad: string;

  @Column({ nullable: false })
  piloto_Horas_Vuelo: number;

  @Column({ nullable: false, array: true, type: 'text' })
  piloto_Certificaciones: string[];

  @Column({ nullable: false, type: 'date' })
  piloto_Fecha_Expedicion_Licencia: Date;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Estado_Logico,
    default: Estado_Logico.ACTIVO,
  })
  piloto_Estado_Logico: Estado_Logico;

  @OneToMany(() => Vuelo, (vuelo) => vuelo.piloto_Id)
  vuelo_Id: Vuelo;

  @OneToMany(() => Vuelo, (vuelo) => vuelo.copiloto_Id)
  copiloto_Id: Vuelo;
}
