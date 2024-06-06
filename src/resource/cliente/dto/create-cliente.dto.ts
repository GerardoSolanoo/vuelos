import { IsOptional, Matches, MaxLength } from "class-validator";
import { Error_Registro } from "src/common/helpers/registro.helpers";

export class CreateClienteDto {

    
    @Matches(/^(\d{3})-(\d{3})-(\d{4})$/, {
        message: Error_Registro.FORMATO_TELEFONO,
    })
    @MaxLength(12)
    @IsOptional()
    usuario_Telefono: string;
}
