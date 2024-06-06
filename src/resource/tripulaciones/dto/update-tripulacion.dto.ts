import { PartialType } from '@nestjs/mapped-types';
import { CreateTripulacionDto } from './create-tripulacion.dto';

export class UpdateTripulacionDto extends PartialType(CreateTripulacionDto) {}
