import { Errores_USUARIO } from "src/common/helpers/usuario.helpers";
import { IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioAdminDto {

    @IsString()
    @MaxLength(50, { message: Errores_USUARIO.USUARIO_NOMBRE_LONGITUD_MAX })
    @MinLength(3, { message: Errores_USUARIO.USUARIO_NOMBRE_LONGITUD_MIN })
    usuarioAd_Nombre : string;

    @IsString()
    @MaxLength(50, { message: Errores_USUARIO.USUARIO_APELLIDOS_LONGITUD_MAX })
    @MinLength(3, { message: Errores_USUARIO.USUARIO_APELLIDOS_LONGITUD_MIN })
    usuarioAd_Apellidos : string;

}
