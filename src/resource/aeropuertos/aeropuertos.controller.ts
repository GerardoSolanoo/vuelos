import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Aeropuertos')
@Controller('aeropuertos')
export class AeropuertosController {
  constructor(private readonly aeropuertosService: AeropuertosService) {}

  @Post()
  async create(@Body() createAeropuertoDto: CreateAeropuertoDto) {
    return this.aeropuertosService.create(createAeropuertoDto);
  }

  @Get()
  async findAll() {
    return this.aeropuertosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.aeropuertosService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAeropuertoDto: UpdateAeropuertoDto,
  ) {
    return this.aeropuertosService.update(+id, updateAeropuertoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.aeropuertosService.remove(+id);
  }
}
