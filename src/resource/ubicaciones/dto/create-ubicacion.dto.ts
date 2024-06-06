import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUbicacionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ubicacion_Nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  latitud: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  longitud: number;
}
