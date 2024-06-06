import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTarifaDistanciaDto {
  @ApiProperty({
    description: 'Nombre de la tarifa de distancia',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  tarifa_Distancia_Nombre: string;

  @ApiProperty({
    description: 'Ubicación de origen para la tarifa de distancia',
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  origenId: number;

  @ApiProperty({
    description: 'Ubicación de destino para la tarifa de distancia',
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  destinoId: number;

  @ApiProperty({
    description: 'Distancia en kilómetros entre el origen y el destino',
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  distancia: number;

  @IsNotEmpty()
  tarifa_Distancia_Estado: any;

  @ApiProperty({
    description: 'Precio de la tarifa de distancia',
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt()
  precioTarifa: number;
}
