import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

export class CreateTarifaClaseDto {
  @ApiProperty({
    description: 'Nombre de la tarifa de clase',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  tarifa_Clase_Nombre: string;

  @ApiProperty({
    description: 'Estado de la tarifa de clase',
    nullable: false,
    example: [
      Estado_Logico.ACTIVO,
      Estado_Logico.INACTIVO,
      Estado_Logico.ELIMINADO,
    ],
  })
  @IsNotEmpty()
  @IsString()
  tarifa_Clase_Estado: Estado_Logico;

  @ApiProperty({
    description: 'Precio de la tarifa de clase',
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  precioTarifa: number;
}
