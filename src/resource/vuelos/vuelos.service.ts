import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateVueloDto } from '../../resource/vuelos/dto/create-vuelo.dto';
import { UpdateVueloDto } from '../../resource/vuelos/dto/update-vuelo.dto';
import { Vuelo } from '../../resource/vuelos/entities/vuelo.entity';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from 'src/common/helpers/operaciones.helpers';

@Injectable()
export class VuelosService {
  private readonly logger = new Logger('VuelosService');

  constructor(
    @InjectRepository(Vuelo)
    private readonly vueloRepository: Repository<Vuelo>,
    private transaccionService: TransaccionService,
  ) {}

  async create(createVueloDto: CreateVueloDto) {
    const vuelo_Creado = await this.transaccionService.transaction(
      Tipo_Transaccion.Guardar,
      Vuelo,
      createVueloDto,
    );

    if (vuelo_Creado == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.EROR_CREAR,
      };
    } else {
      return {
        status: 201,
        message: Exito_Operaciones.Crear,
      };
    }
  }

  async findAll() {
    return await this.vueloRepository.find();
  }

  async findOne(id: number | FindOneOptions<Vuelo>) {
    const options: FindOneOptions<Vuelo> =
      typeof id === 'number' ? { where: { Vuelo_ID: id } } : id;
    const vuelo = await this.vueloRepository.findOne(options);
    if (!vuelo) {
      if (typeof id === 'number') {
        throw new NotFoundException(`Vuelo with ID ${id} not found`);
      } else {
        throw new NotFoundException(`Vuelo not found`);
      }
    }
    return vuelo;
  }

  async update(id: number, updateAvionDto: UpdateVueloDto) {
    const avion_Modificar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar,
      Vuelo,
      updateAvionDto,
      '',
      id.toString(),
    );

    if (avion_Modificar == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.ERROR_ACTUALIZAR,
      };
    } else {
      return {
        status: 200,
        message: Exito_Operaciones.Actualizar,
      };
    }
  }

  async remove(id: number) {
    const avion_Eliminar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar_Con_Parametros,
      Vuelo,
      Estado_Logico.ELIMINADO,
      'vuelo_Estado_Logico',
      id.toString(),
    );

    if (avion_Eliminar == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.ERROR_ELIMINAR,
      };
    } else {
      return {
        status: 200,
        message: Exito_Operaciones.Eliminar,
      };
    }
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new Error('Unexpected error occurred');
  }
}
