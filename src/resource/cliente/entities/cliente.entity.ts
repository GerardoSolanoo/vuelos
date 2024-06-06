import { Usuario } from '../../../resource/usuario/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id_Cliente: number;

  @Column({ nullable: false })
  cliente_Direccion: string;

  @Column({ nullable: false })
  cliente_Telefono: string;

  @Column()
  @OneToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_Usuario' })
  id_Usuario: Usuario;
}
