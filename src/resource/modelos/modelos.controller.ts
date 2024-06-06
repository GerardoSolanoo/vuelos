import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { CreateModeloAvionDto } from './dto/create-modelo-avion.dto';
import { UpdateModeloAvionDto } from './dto/update-modelo-avion.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Modelos')
@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Post()
  async create(@Body() createModeloDto: CreateModeloAvionDto) {
    return this.modelosService.create(createModeloDto);
  }

  @Get()
  async findAll() {
    return this.modelosService.findAll();
  }

  @Get('buscarModelo/:nombre')
  async findByName(@Param('nombre') nombre: string) {
    return this.modelosService.findByName(nombre);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModeloDto: UpdateModeloAvionDto,
  ) {
    return this.modelosService.update(+id, updateModeloDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.modelosService.remove(+id);
  }
}
