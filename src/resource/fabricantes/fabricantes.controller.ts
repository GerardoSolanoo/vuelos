import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FabricantesService } from './fabricantes.service';
import { CreateFabricanteDto } from './dto/create-fabricante.dto';
import { UpdateFabricanteDto } from './dto/update-fabricante.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(private readonly fabricantesService: FabricantesService) {}

  @Post()
  async create(@Body() createFabricanteDto: CreateFabricanteDto) {
    return this.fabricantesService.create(createFabricanteDto);
  }

  @Get()
  async findAll() {
    return this.fabricantesService.findAll();
  }

  @Get('buscarFabricante/:nombre')
  async findByName(@Param('nombre') nombre: string) {
    return this.fabricantesService.findByName(nombre);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFabricanteDto: UpdateFabricanteDto,
  ) {
    return this.fabricantesService.update(+id, updateFabricanteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fabricantesService.remove(+id);
  }
}
