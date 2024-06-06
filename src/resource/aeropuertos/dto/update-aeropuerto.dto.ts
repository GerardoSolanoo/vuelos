import { PartialType } from '@nestjs/swagger';
import { CreateAeropuertoDto } from './create-aeropuerto.dto';

export class UpdateAeropuertoDto extends PartialType(CreateAeropuertoDto) {}
