import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import {
  IsString,
  IsPhoneNumber,
  MaxLength,
  Matches,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { Error_Registro } from '../../../common/helpers/registro.helpers';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString()
  @MaxLength(50)
  usuario_Nombres: string;

  @IsString()
  @MaxLength(50)
  usuario_Apellidos: string;

  @IsNumber()
  @MaxLength(3)
  @Max(120, { message: Error_Registro.EDAD_MAXIMA })
  @Min(18, { message: Error_Registro.EDAD_MINIMA })
  usuario_Edad: number;

  @Matches(/^(\d{3})-(\d{3})-(\d{4})$/, {
    message: Error_Registro.FORMATO_TELEFONO,
  })
  @MaxLength(12)
  Usuario_Telefono: string;
}
