import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';
import { CreateModeloAvionDto } from './dto/create-modelo-avion.dto';
import { UpdateModeloAvionDto } from './dto/update-modelo-avion.dto';
import { ModeloAvion } from './entities/modelo-avion.entity';

@Injectable()
export class ModelosService {
  private readonly logger = new Logger('ModelosService');

  constructor(
    @InjectRepository(ModeloAvion)
    private readonly modelosRepository: Repository<ModeloAvion>,
    private transaccionService: TransaccionService,
  ) {}

  async create(createModelosDto: CreateModeloAvionDto) {
    const modelo_Creado = await this.transaccionService.transaction(
      Tipo_Transaccion.Guardar,
      ModeloAvion,
      createModelosDto,
    );

    if (modelo_Creado == 'Error') {
      return {
        status: 400,
        message: 'Error al crear el modelo',
      };
    } else {
      return {
        status: 200,
        message: 'Modelo creado con éxito',
        modelo: modelo_Creado,
      };
    }
  }

  async findAll() {
    return await this.modelosRepository.find();
  }

  async findByName(name: string) {
    const modelo_Consultado = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar_Con_Parametros,
      ModeloAvion,
      '',
      'modelo_Avion_Nombre',
      name,
    );

    if (modelo_Consultado == 'Error') {
      return {
        status: 400,
        message: 'Error al consultar el modelo',
      };
    } else {
      return {
        status: 200,
        message: modelo_Consultado,
      };
    }
  }

  async update(id: number, updateModeloDto: UpdateModeloAvionDto) {
    const modelo_Actualizar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar_Con_Parametros,
      ModeloAvion,
      updateModeloDto,
      'modelo_Avion_Id',
      id.toString(),
    );

    if (modelo_Actualizar == 'Error') {
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
    const modelo_Eliminar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar_Con_Parametros,
      ModeloAvion,
      Estado_Logico.ELIMINADO,
      'modelo_Avion_Estado',
      id.toString(),
    );

    if (modelo_Eliminar == 'Error') {
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
