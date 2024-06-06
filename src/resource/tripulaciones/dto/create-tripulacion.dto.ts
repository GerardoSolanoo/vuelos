import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripulacionDto {
  @ApiProperty({
    description: 'Nombre del equipo de tripulación',
    nullable: false,
    minLength: 2,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  tripulacion_NombreEquipo: string;

  @ApiProperty({
    description: 'Cantidad de tripulantes',
    nullable: false,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  tripulacion_CantidadTripulantes: number;

  @ApiProperty({
    description: 'Clase del viaje',
    nullable: false,
    minLength: 2,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  tripulacion_ClaseViaje: string;

  @ApiProperty({
    description: 'Valoración de la tripulación',
    nullable: false,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  tripulacion_Valoracion: number;

  @ApiProperty({
    description: 'IDs de los trabajadores',
    nullable: false,
    type: [Number],
    example: [1, 2, 3],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  id: any;
}
