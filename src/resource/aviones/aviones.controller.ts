import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvionesService } from './aviones.service';
import { CreateAvionDto } from './dto/create-avion.dto';
import { UpdateAvionDto } from './dto/update-avion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Aviones')
@Controller('aviones')
export class AvionesController {
  constructor(private readonly avionesService: AvionesService) {}

  @Post()
  async create(@Body() createAvioneDto: CreateAvionDto) {
    return this.avionesService.create(createAvioneDto);
  }

  @Get()
  async findAll() {
    return this.avionesService.findAll();
  }

  @Get('buscarModelo/:modelo')
  async findbyModelo(@Param('modelo') modelo: any) {
    return this.avionesService.findbyModelo(modelo.modelo);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAvioneDto: UpdateAvionDto,
  ) {
    return this.avionesService.update(+id, updateAvioneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.avionesService.remove(+id);
  }
}
