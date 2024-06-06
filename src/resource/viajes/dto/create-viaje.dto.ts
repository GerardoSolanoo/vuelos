import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { Estado_Viaje } from 'src/common/enums/estado-viaje.enum';

export class CreateViajeDto {
  @ApiProperty({
    description: 'Fecha de salida del viaje en formato ISO',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  fechaSalida: Date;

  @ApiProperty({
    description: 'Fecha de llegada del viaje en formato ISO',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  fechaLlegada: Date;

  @ApiProperty({
    description: 'Estado del viaje',
    nullable: false,
    example: Estado_Viaje.EN_CURSO,
  })
  @IsEnum(Estado_Viaje)
  estadoViaje: Estado_Viaje;

  @ApiProperty({
    description: 'Número de avión',
    nullable: false,
    example: 75,
  })
  @IsNotEmpty()
  @IsNumber()
  numeroAvion: number;

  @ApiProperty({
    description: 'Aeropuerto de destino',
    nullable: false,
    example: 7,
  })
  @IsNotEmpty()
  @IsNumber()
  aeropuertoDestino: number;

  @ApiProperty({
    description: 'Aeropuerto de origen',
    nullable: false,
    example: 27,
  })
  @IsNotEmpty()
  @IsNumber()
  aeropuertoOrigen: number;

  @ApiProperty({
    description: 'ID de vuelo',
    nullable: false,
    example: 6,
  })
  @IsNotEmpty()
  @IsNumber()
  vueloId: number;
}
