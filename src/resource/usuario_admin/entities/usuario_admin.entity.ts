import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsuarioAdmin {

    @PrimaryGeneratedColumn()
    id_usuarioAdmin: number;

    @Column({ nullable: false, length: 50})
    usuarioAd_Nombre: string;

    @Column({ nullable: false, length: 50})
    usuarioAd_Apellidos: string;

}
