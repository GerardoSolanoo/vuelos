import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaDto } from './create-cuenta.dto';

import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { Roles } from '../../../common/enums/roles.enum';
import { Errores_Enum } from '../../../common/helpers/enums.helpers';
import { Usuario } from '../../../resource/usuario/entities/usuario.entity';

export class UpdateCuentaDto extends PartialType(CreateCuentaDto) {
  @IsNotEmpty()
  // Formato de correo electrónico Irving@gmail.com, formato de identificador ABC-4SD-78A
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

  @IsNotEmpty()
  @IsString()
  @IsEnum(Roles, { message: Errores_Enum.ENUMS_DISPONIBLES })
  estado_cuenta: string;

  @IsString()
  rol: string;

  @IsNotEmpty()
  id_usuario?: Usuario;
}
