import { PartialType } from '@nestjs/swagger';
import { CreateModeloAvionDto } from './create-modelo-avion.dto';

export class UpdateModeloAvionDto extends PartialType(CreateModeloAvionDto) {}
