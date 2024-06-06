import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Tarjeta } from '../../../resource/tarjeta/entities/tarjeta.entity';
import { Usuario } from '../../../resource/usuario/entities/usuario.entity';

export class CreateCuentaDto {
  @IsNotEmpty()
  // Formato de correo electrónico Irving@gmail.com, formato de identificador ABC-4SD-78A
  @Matches(
    /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3})$/,
  ) // Expresión regular combinada para correo electrónico o identificador
  cuenta_Identificador: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  cuenta_Contraseña: string;

  @IsNumber()
  id_Usuario: Usuario;

  @IsOptional()
  @Matches(/^(?:[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3})$/) // Expresión regular del identificador
  @Transform(({ value }) => value.trim())
  cuenta_Numero_Activacion: string;

  @IsOptional()
  @IsString()
  cuenta_Fecha_Registro: string;

  @IsOptional()
  @IsNumber()
  id_Tarjeta: Tarjeta;
}
