import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateTrabajadorDto {
  @ApiProperty({
    description: 'Nombre del trabajador',
    nullable: false,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  trabajador_Nombre: string;

  @ApiProperty({
    description: 'Apellidos del trabajador',
    nullable: false,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  trabajador_Apellidos: string;

  @ApiProperty({
    description: 'Teléfono del trabajador',
    nullable: false,
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  trabajador_Telefono: string;

  @ApiProperty({
    description: 'Correo electrónico del trabajador',
    nullable: false,
    minLength: 5,
  })
  @IsNotEmpty()
  @IsEmail()
  trabajador_CorreoElectronico: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del trabajador',
    nullable: false,
  })
  @IsNotEmpty()
  @IsDateString()
  trabajador_FechaNacimiento: Date;

  @ApiProperty({
    description: 'Nacionalidad del trabajador',
    nullable: false,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  trabajador_Nacionalidad: string;

  @ApiProperty({
    description: 'Horas de vuelo del trabajador',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  trabajador_HorasVuelo: number;
}
