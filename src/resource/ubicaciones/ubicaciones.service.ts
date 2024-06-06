import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { Ubicacion } from './entities/ubicacion.entity';

@Injectable()
export class UbicacionesService {
  private readonly logger = new Logger('UbicacionesService');

  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
  ) {}

  async create(createUbicacionDto: CreateUbicacionDto) {
    try {
      const ubicacion = this.ubicacionRepository.create(createUbicacionDto);
      await this.ubicacionRepository.save(ubicacion);
      return ubicacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.ubicacionRepository.find();
  }

  async findOne(id: number | FindOneOptions<Ubicacion>) {
    const options: FindOneOptions<Ubicacion> =
      typeof id === 'number' ? { where: { ubicacion_Id: id } } : id;
    const ubicacion = await this.ubicacionRepository.findOne(options);
    if (!ubicacion) {
      if (typeof id === 'number') {
        throw new NotFoundException(`Ubicación
         with ID ${id} not found`);
      } else {
        throw new NotFoundException(`Ubicación not found`);
      }
    }
    return ubicacion;
  }

  async update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
    const ubicacion = await this.findOne(id);
    this.ubicacionRepository.merge(ubicacion, updateUbicacionDto);
    return await this.ubicacionRepository.save(ubicacion);
  }

  async remove(id: number) {
    const ubicacion = await this.findOne(id);
    return await this.ubicacionRepository.remove(ubicacion);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new Error('Unexpected error occurred');
  }
}
