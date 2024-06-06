import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @Post()
  async create(@Body() createUbicacioneDto: CreateUbicacionDto) {
    return this.ubicacionesService.create(createUbicacioneDto);
  }

  @Get()
  async findAll() {
    return this.ubicacionesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ubicacionesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUbicacioneDto: UpdateUbicacionDto,
  ) {
    return this.ubicacionesService.update(+id, updateUbicacioneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ubicacionesService.remove(+id);
  }
}
