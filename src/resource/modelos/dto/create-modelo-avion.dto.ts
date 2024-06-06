import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriaModelo } from '../../../common/enums/categoria-modelo.enum';
import { ESTADO_OPERATIVO } from 'src/common/enums/estado-operativo.enum';

export class CreateModeloAvionDto {
  @ApiProperty({
    description: 'Nombre del modelo de avión',
    nullable: false,
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  modelo_Avion_Nombre: string;

  @ApiProperty({
    description: 'Nombre del modelo de avión',
    nullable: false,
    example: [
      ESTADO_OPERATIVO.OPERATIVO,
      ESTADO_OPERATIVO.MANTENIMIENTO,
      ESTADO_OPERATIVO.FUERA_DE_SERVICIO,
    ],
  })
  @IsEnum(ESTADO_OPERATIVO)
  @IsNotEmpty()
  modelo_Avion_Estado: ESTADO_OPERATIVO;

  @ApiProperty({
    enum: CategoriaModelo,
    description: 'Categoría del modelo de avión',
    nullable: false,
    example: [
      CategoriaModelo.COMERCIAL,
      CategoriaModelo.CARGUERO,
      CategoriaModelo.MILITAR,
      CategoriaModelo.PRIVADO,
    ],
  })
  @IsEnum(CategoriaModelo)
  @IsNotEmpty()
  modelo_Avion_Categoria: CategoriaModelo;
}
