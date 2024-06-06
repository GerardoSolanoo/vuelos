import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import { Trabajador } from './entities/trabajador.entity';

@Injectable()
export class TrabajadoresService {
  private readonly logger = new Logger('TrabajadoresService');

  constructor(
    @InjectRepository(Trabajador)
    private readonly trabajadoresRepository: Repository<Trabajador>,
  ) {}

  async create(createTrabajadorDto: CreateTrabajadorDto) {
    try {
      const trabajador =
        this.trabajadoresRepository.create(createTrabajadorDto);
      await this.trabajadoresRepository.save(trabajador);
      return trabajador;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.trabajadoresRepository.find();
  }

  async findOne(id: number | FindOneOptions<Trabajador>) {
    const options: FindOneOptions<Trabajador> =
      typeof id === 'number' ? { where: { id } } : id;
    const trabajador = await this.trabajadoresRepository.findOne(options);
    if (!trabajador) {
      if (typeof id === 'number') {
        throw new NotFoundException(`Trabajador
         with ID ${id} not found`);
      } else {
        throw new NotFoundException(`Trabajador not found`);
      }
    }
    return trabajador;
  }

  async update(id: number, updateTrabajadorDto: UpdateTrabajadorDto) {
    const trabajador = await this.findOne(id);
    this.trabajadoresRepository.merge(trabajador, updateTrabajadorDto);
    return await this.trabajadoresRepository.save(trabajador);
  }

  async remove(id: number) {
    const trabajador = await this.findOne(id);
    return await this.trabajadoresRepository.remove(trabajador);
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new Error('Unexpected error occurred');
  }
}
