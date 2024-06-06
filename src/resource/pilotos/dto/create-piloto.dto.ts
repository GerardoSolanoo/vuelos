import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

export class CreatePilotoDto {
  @ApiProperty({
    description: 'Nombre del piloto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  piloto_Nombre: string;

  @ApiProperty({
    description: 'Apellidos del piloto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  piloto_Apellidos: string;

  @ApiProperty({
    description: 'Dirección del piloto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  piloto_Telefono: string;

  @ApiProperty({
    description: 'Correo electrónico del piloto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  piloto_Correo_Electronico: string;

  @ApiProperty({
    description: 'Número de licencia del piloto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  piloto_Licencia_Piloto: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del piloto (YYYY-MM-DD)',
    nullable: false,
  })
  @IsDateString()
  @IsNotEmpty()
  piloto_Fecha_Nacimiento: Date;

  @ApiProperty({
    description: 'Nacionalidad del piloto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  piloto_Nacionalidad: string;

  @ApiProperty({
    description: 'Número de horas de vuelo del piloto',
    nullable: false,
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  piloto_Horas_Vuelo: number;

  @ApiProperty({
    description: 'Certificaciones del piloto',
    nullable: false,
    minItems: 1,
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  piloto_Certificaciones: string[];

  @ApiProperty({
    description: 'Fecha de expedición de la licencia del piloto (YYYY-MM-DD)',
    nullable: false,
  })
  @IsDateString()
  @IsNotEmpty()
  piloto_Fecha_Expedicion_Licencia: Date;

  @ApiProperty({
    description: 'Estado lógico del piloto',
    nullable: false,
    default: 'ACTIVO',
    example: [
      Estado_Logico.ACTIVO,
      Estado_Logico.INACTIVO,
      Estado_Logico.ELIMINADO,
    ],
  })
  @IsEnum(Estado_Logico)
  @IsNotEmpty()
  piloto_Estado_Logico: Estado_Logico;
}
