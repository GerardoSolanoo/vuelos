import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrabajadoresService } from './trabajadores.service';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trabajadores')
@Controller('trabajadores')
export class TrabajadoresController {
  constructor(private readonly trabajadoresService: TrabajadoresService) {}

  @Post()
  async create(@Body() createTrabajadoreDto: CreateTrabajadorDto) {
    return this.trabajadoresService.create(createTrabajadoreDto);
  }

  @Get()
  async findAll() {
    return this.trabajadoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trabajadoresService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrabajadoreDto: UpdateTrabajadorDto,
  ) {
    return this.trabajadoresService.update(+id, updateTrabajadoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trabajadoresService.remove(+id);
  }
}
