import { Transform } from 'class-transformer';

import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  //Formato para usuario
  @Matches(
    /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3})$/,
  ) // Expresión regular combinada para correo electrónico o identificador
  identificador: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  contraseña: string;
}
