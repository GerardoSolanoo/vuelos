import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { ESTADO_OPERATIVO } from '../../../common/enums/estado-operativo.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

export class CreateAvionDto {
  @ApiProperty({
    description: 'ID del modelo de avión del avión',
    nullable: false,
  })
  @IsNotEmpty()
  modeloAvionId: number;

  @ApiProperty({
    description: 'ID del fabricante del avión',
    nullable: false,
  })
  @IsNotEmpty()
  fabricanteId: number;

  @ApiProperty({
    description: 'Capacidad de pasajeros del avión',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  avion_Capacidad_Pasajeros: number;

  @ApiProperty({
    description: 'Capacidad de carga del avión',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  avion_Capacidad_Carga: number;

  @ApiProperty({
    description: 'Velocidad máxima del avión',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  avion_Velocidad_Maxima: number;

  @ApiProperty({
    description: 'Año de fabricación del avión',
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  avion_Anio_Fabricacion: number;

  @ApiProperty({
    enum: ESTADO_OPERATIVO,
    description: 'Estado operativo del avión',
    nullable: false,
    example: [
      ESTADO_OPERATIVO.OPERATIVO,
      ESTADO_OPERATIVO.MANTENIMIENTO,
      ESTADO_OPERATIVO.FUERA_DE_SERVICIO,
    ],
  })
  @IsEnum(ESTADO_OPERATIVO)
  @IsNotEmpty()
  avion_Estado_Operativo: ESTADO_OPERATIVO;

  @ApiProperty({
    description: 'Estado lógico del avión',
    nullable: false,
    example: [
      Estado_Logico.ACTIVO,
      Estado_Logico.INACTIVO,
      Estado_Logico.ELIMINADO,
    ],
  })
  @IsEnum(ESTADO_OPERATIVO)
  @IsNotEmpty()
  avion_Estado_Logico: Estado_Logico;

  @ApiProperty({
    description: 'Tipo de motor del avión',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  avion_Tipo_Motor: string;

  @ApiProperty({
    description: 'Autonomía del avión',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  avion_Autonomia: string;
}
