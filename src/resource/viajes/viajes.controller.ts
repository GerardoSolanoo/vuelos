import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  @Post()
  async create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajesService.create(createViajeDto);
  }

  @Get()
  async findAll() {
    return this.viajesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.viajesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateViajeDto: UpdateViajeDto,
  ) {
    return this.viajesService.update(+id, updateViajeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.viajesService.remove(+id);
  }
}
