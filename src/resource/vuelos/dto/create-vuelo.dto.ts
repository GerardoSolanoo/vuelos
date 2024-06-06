import {
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsEnum,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Estado_Viaje } from 'src/common/enums/estado-viaje.enum';

export class CreateVueloDto {
  @ApiProperty({ description: 'ID del avión', nullable: false })
  @IsNotEmpty()
  @IsInt()
  avion_Id: number;

  @ApiProperty({
    description: 'Fecha del vuelo',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @ApiProperty({ description: 'ID del piloto', nullable: false })
  @IsNotEmpty()
  @IsInt()
  piloto_Id: number;

  @ApiProperty({ description: 'ID del copiloto', nullable: false })
  @IsNotEmpty()
  @IsInt()
  copiloto_Id: number;

  @ApiProperty({ description: 'ID de la tripulación', nullable: false })
  @IsNotEmpty()
  @IsInt()
  tripulacion_ID: number;

  @ApiProperty({ description: 'Hora de salida del vuelo', nullable: false })
  @IsNotEmpty()
  @IsDateString()
  horaSalida: Date;

  @ApiProperty({ description: 'Cantidad total de pasajeros', nullable: false })
  @IsNotEmpty()
  @IsInt()
  pasajerosTotales: number;

  @ApiProperty({
    description: 'Cantidad de pasajeros apartados',
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  pasajerosApartados: number;

  @ApiProperty({
    description: 'Estado del vuelo',
    enum: Estado_Viaje,
    nullable: false,
    enumName: 'EstadoVuelo',
  })
  @IsEnum(Estado_Viaje)
  @IsNotEmpty()
  estado: Estado_Viaje;

  @ApiProperty({ description: 'ID de la tarifa de clase', nullable: false })
  @IsNotEmpty()
  @IsInt()
  tarifa_Clase_Id: number;

  @ApiProperty({ description: 'ID de la tarifa de distancia', nullable: false })
  @IsNotEmpty()
  @IsInt()
  tarifa_distancia_Id: number;
}
