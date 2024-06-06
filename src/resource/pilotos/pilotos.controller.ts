import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PilotosService } from './pilotos.service';
import { CreatePilotoDto } from './dto/create-piloto.dto';
import { UpdatePilotoDto } from './dto/update-piloto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pilotos')
@Controller('pilotos')
export class PilotosController {
  constructor(private readonly pilotosService: PilotosService) {}

  @Post()
  async create(@Body() createPilotoDto: CreatePilotoDto) {
    return this.pilotosService.create(createPilotoDto);
  }

  @Get()
  async findAll() {
    return this.pilotosService.findAll();
  }

  @Get('buscarPiloto/:nombre')
  async findbyName(@Param('nombre') nombre: string) {
    return this.pilotosService.findbyName(nombre);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePilotoDto: UpdatePilotoDto,
  ) {
    return this.pilotosService.update(+id, updatePilotoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pilotosService.remove(+id);
  }
}
