import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { Viaje } from './entities/viaje.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from 'src/common/helpers/operaciones.helpers';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

@Injectable()
export class ViajesService {
  private readonly logger = new Logger('ViajesService');

  constructor(
    private transaccionService: TransaccionService,
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
  ) {}

  async create(createViajeDto: CreateViajeDto) {
    const viaje_Creado = await this.transaccionService.transaction(
      Tipo_Transaccion.Guardar,
      Viaje,
      createViajeDto,
    );

    if (viaje_Creado == 'Error') {
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
    return await this.viajeRepository.find();
  }

  async findOne(id: number) {
    const viaje = await this.viajeRepository.findOne({
      where: { Viaje_ID: id },
    });
    if (!viaje) {
      throw new NotFoundException(`Viaje with ID ${id} not found`);
    }
    return viaje;
  }

  async update(id: number, updateViajeDto: UpdateViajeDto) {
    const viaje_Actualizar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar,
      Viaje,
      updateViajeDto,
      '',
      id.toString(),
    );

    if (viaje_Actualizar == 'Error') {
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
    const viaje_Eliminar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar_Con_Parametros,
      Viaje,
      Estado_Logico.ELIMINADO,
      'Viaje_Estado',
      id.toString(),
    );

    if (viaje_Eliminar == 'Error') {
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
