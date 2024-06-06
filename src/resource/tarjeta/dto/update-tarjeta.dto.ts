import { PartialType } from '@nestjs/mapped-types';
import { CreateTarjetaDto } from './create-tarjeta.dto';

import { IsNumber, IsString, Matches } from 'class-validator';
import { Error_Registro } from '../../../common/helpers/registro.helpers';

export class UpdateTarjetaDto extends PartialType(CreateTarjetaDto) {}
