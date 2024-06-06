import { Error_Registro } from '../../../common/helpers/registro.helpers';
import {
  IsString,
  IsPhoneNumber,
  MaxLength,
  Matches,
  IsNumber,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(50)
  usuario_Nombre: string;

  @IsString()
  @MaxLength(50)
  usuario_Apellidos: string;

  @IsNumber()
  @MaxLength(3)
  @Max(120, { message: Error_Registro.EDAD_MAXIMA })
  @Min(18, { message: Error_Registro.EDAD_MINIMA })
  @MinLength(2)
  usuario_Edad: number;
}
