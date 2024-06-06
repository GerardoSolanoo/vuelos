import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTripulacionDto } from './dto/create-tripulacion.dto';
import { UpdateTripulacionDto } from './dto/update-tripulacion.dto';
import { Tripulacion } from './entities/tripulacion.entity';

@Injectable()
export class TripulacionesService {
  private readonly logger = new Logger('TripulacionesService');

  constructor(
    @InjectRepository(Tripulacion)
    private readonly tripulacionesRepository: Repository<Tripulacion>,
  ) {}

  async create(createTripulacionDto: CreateTripulacionDto) {
    try {
      const tripulacion =
        this.tripulacionesRepository.create(createTripulacionDto);
      await this.tripulacionesRepository.save(tripulacion);
      return tripulacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.tripulacionesRepository.find();
  }

  async findOne(id: number | FindOneOptions<Tripulacion>) {
    const options: FindOneOptions<Tripulacion> =
      typeof id === 'number' ? { where: { tripulacion_ID: id } } : id;
    const tripulacion = await this.tripulacionesRepository.findOne(options);
    if (!tripulacion) {
      if (typeof id === 'number') {
        throw new NotFoundException(`Tripulacion with ID ${id} not found`);
      } else {
        throw new NotFoundException(`Tripulacion not found`);
      }
    }
    return tripulacion;
  }

  async update(id: number, updateTripulacionDto: UpdateTripulacionDto) {
    const tripulacion = await this.findOne(id);
    this.tripulacionesRepository.merge(tripulacion, updateTripulacionDto);
    return await this.tripulacionesRepository.save(tripulacion);
  }

  async remove(id: number) {
    const trabajador = await this.findOne(id);
    return await this.tripulacionesRepository.remove(trabajador);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new Error('Unexpected error occurred');
  }
}
