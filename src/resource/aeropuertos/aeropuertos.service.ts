import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertosService {
  private readonly logger = new Logger('AeropuertoService');

  constructor(
    @InjectRepository(Aeropuerto)
    private readonly aeropuertoRepository: Repository<Aeropuerto>,
  ) {}

  async create(createAeropuertoDto: CreateAeropuertoDto) {
    try {
      const aeropuerto = this.aeropuertoRepository.create(createAeropuertoDto);
      await this.aeropuertoRepository.save(aeropuerto);
      return aeropuerto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.aeropuertoRepository.find({
      relations: ['aeropuerto_Ubicacion'],
    });
  }

  async findOne(id: number | FindOneOptions<Aeropuerto>) {
    const options: FindOneOptions<Aeropuerto> =
      typeof id === 'number' ? { where: { id } } : id;
    const aeropuerto = await this.aeropuertoRepository.findOne(options);
    if (!aeropuerto) {
      if (typeof id === 'number') {
        throw new NotFoundException(`Aeropuerto with ID ${id} not found`);
      } else {
        throw new NotFoundException(`Aeropuerto not found`);
      }
    }
    return aeropuerto;
  }

  async update(id: number, updateAeropuertoDto: UpdateAeropuertoDto) {
    const aeropuerto = await this.findOne(id);
    this.aeropuertoRepository.merge(aeropuerto, updateAeropuertoDto);
    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async remove(id: number) {
    const aeropuerto = await this.findOne(id);
    return await this.aeropuertoRepository.remove(aeropuerto);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new Error('Unexpected error occurred');
  }
}
