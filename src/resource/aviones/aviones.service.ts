import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAvionDto } from '../../resource/aviones/dto/create-avion.dto';
import { UpdateAvionDto } from '../../resource/aviones/dto/update-avion.dto';
import { Avion } from '../../resource/aviones/entities/avion.entity';

import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';

import { ModeloAvion } from '../../resource/modelos/entities/modelo-avion.entity';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';

@Injectable()
export class AvionesService {
  private readonly logger = new Logger('AvionesService');

  constructor(
    @InjectRepository(Avion)
    private readonly avionRepository: Repository<Avion>,
    private transaccionService: TransaccionService,
  ) {}

  async create(createAvionDto: CreateAvionDto) {
    const avion_Creado = await this.transaccionService.transaction(
      Tipo_Transaccion.Guardar,
      Avion,
      createAvionDto,
    );

    if (avion_Creado == 'Error') {
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
    return await this.avionRepository.find();
  }

  async findbyModelo(modelo: string) {
    const modelo_Buscar = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar_Con_Parametros,
      ModeloAvion,
      '',
      'modelo_Avion_Nombre',
      modelo,
    );
    let modelo_ID;
    if (modelo_Buscar == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.ERROR_CONSULTAR,
      };
    } else {
      console.log(modelo_Buscar, 'ModeloAvion');
      modelo_ID = modelo_Buscar[0].modelo_Avion_Id;
    }

    const avion_Buscar = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar_Con_Parametros,
      Avion,
      '',
      'modeloAvionId',
      modelo_ID.toString(),
    );

    if (avion_Buscar == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.ERROR_CONSULTAR,
      };
    } else {
      return {
        status: 200,
        message: avion_Buscar,
      };
    }
  }

  async update(id: number, updateAvionDto: UpdateAvionDto) {
    const avion_Modificar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar,
      Avion,
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
      Avion,
      Estado_Logico.ELIMINADO,
      'avion_Estado_Logico',
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
