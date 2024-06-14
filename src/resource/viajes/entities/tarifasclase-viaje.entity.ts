import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Viaje } from "./viaje.entity";
import { TarifaClase } from "../../../resource/tarifas-clase/entities/tarifa-clase.entity";

@Entity()
export class TarifaClaseViajes {
    @PrimaryGeneratedColumn()
    id_tarifasclase_viaje: number
    @ManyToOne(() => Viaje)
    viaje: Viaje
    @ManyToOne(() => TarifaClase, { eager: true })
    tarfa_clase: TarifaClase
}
