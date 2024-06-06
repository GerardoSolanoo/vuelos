import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateVueloDto } from './dto/update-vuelo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vuelos')
@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Post()
  async create(@Body() createVueloDto: CreateVueloDto) {
    return this.vuelosService.create(createVueloDto);
  }

  @Get()
  async findAll() {
    return this.vuelosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vuelosService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVueloDto: UpdateVueloDto,
  ) {
    return this.vuelosService.update(+id, updateVueloDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vuelosService.remove(+id);
  }
}
