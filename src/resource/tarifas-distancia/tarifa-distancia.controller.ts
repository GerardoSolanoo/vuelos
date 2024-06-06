import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTarifaDistanciaDto } from './dto/create-tarifa-distancia.dto';
import { TarifaDistanciaService } from './tarifa-distancia.service';

@ApiTags('Tarifas Distancia')
@Controller('tarifas-distancia')
export class TarifaDistanciaController {
  constructor(
    private readonly tarifaDistanciaService: TarifaDistanciaService,
  ) {}

  @Post()
  async create(@Body() createTarifaDistanciaDto: CreateTarifaDistanciaDto) {
    return this.tarifaDistanciaService.create(createTarifaDistanciaDto);
  }

  @Get()
  async findAll() {
    return this.tarifaDistanciaService.findAll();
  }

  @Get('buscarTarifaDistancia/:nombre')
  async findByClassName(@Param('nombre') nombre: string) {
    try {
      const tarifaClase = await this.tarifaDistanciaService.findbyName(nombre);
      return { status: 200, data: tarifaClase };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      return { status: 500, message: 'Internal server error' };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTarifaDistanciaDto: CreateTarifaDistanciaDto,
  ) {
    return this.tarifaDistanciaService.update(+id, updateTarifaDistanciaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tarifaDistanciaService.remove(+id);
  }
}
