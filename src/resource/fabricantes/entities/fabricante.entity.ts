import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Avion } from '../../aviones/entities/avion.entity';

@Entity()
export class Fabricante {
  @PrimaryGeneratedColumn()
  fabricante_Id: number;

  @Column({ nullable: false })
  fabricante_Nombre: string;

  @Column({ nullable: false })
  fabricante_Descripcion: string;

  @Column({ nullable: false })
  fabricante_Telefono: string;

  @Column({ nullable: false })
  fabricante_Email: string;

  @OneToMany(() => Avion, (avion) => avion.fabricanteId)
  avion_Id: Avion[];
}
