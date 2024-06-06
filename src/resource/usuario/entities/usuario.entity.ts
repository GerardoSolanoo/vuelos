import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_Usuario: number;

  @Column({ nullable: false })
  usuario_Nombre: string;

  @Column({ nullable: false })
  usuario_Apellidos: string;

  @Column({ nullable: false })
  usuario_Edad: number;
}
