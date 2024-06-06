import { IsNotEmpty, IsString, IsEnum, IsInt } from 'class-validator';
import { TipoAeropuerto } from 'src/common/enums/tipo_aeropuerto.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAeropuertoDto {
  @ApiProperty({
    description: 'Nombre del aeropuerto',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  aeropuerto_Nombre: string;

  @ApiProperty({
    enum: TipoAeropuerto,
    description: 'Tipo de aeropuerto',
    nullable: false,
    example: [
      TipoAeropuerto.NACIONAL,
      TipoAeropuerto.INTERNACIONAL,
      TipoAeropuerto.PRIVADO,
    ],
  })
  @IsEnum(TipoAeropuerto)
  aeropuerto_Tipo: TipoAeropuerto;

  @ApiProperty({
    description: 'ID de la ubicación del aeropuerto',
    nullable: false,
  })
  @IsInt()
  aeropuerto_Ubicacion: number;
}
