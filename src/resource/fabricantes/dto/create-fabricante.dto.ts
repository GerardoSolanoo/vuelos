import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFabricanteDto {
  @ApiProperty({
    description: 'Nombre del fabricante',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  fabricante_Nombre: string;

  @ApiProperty({
    description: 'Descripción del fabricante',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  fabricante_Descripcion: string;

  @ApiProperty({
    description: 'Dirección del fabricante',
    nullable: false,
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  fabricante_Telefono: string;

  @ApiProperty({
    description: 'Correo electrónico del fabricante',
    nullable: false,
    minLength: 5,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  fabricante_Email: string;
}
