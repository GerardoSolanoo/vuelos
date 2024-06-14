import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFabricanteDto } from './dto/create-fabricante.dto';
import { UpdateFabricanteDto } from './dto/update-fabricante.dto';
import { Fabricante } from './entities/fabricante.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';

@Injectable()
export class FabricantesService {
  private readonly logger = new Logger('FabricantesService');

  constructor(
    private transaccionService: TransaccionService,
    @InjectRepository(Fabricante)
    private readonly fabricanteRepository: Repository<Fabricante>,
  ) {}

  async create(createFabricanteDto: CreateFabricanteDto) {
    const fabricante_Creado = await this.transaccionService.transaction(
      Tipo_Transaccion.Guardar,
      Fabricante,
      createFabricanteDto,
    );

    if (fabricante_Creado == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.EROR_CREAR,
      };
    } else {
      return {
        status: 200,
        message: Exito_Operaciones.Crear,
      };
    }
  }

  async findAll() {
    return await this.fabricanteRepository.find();
  }

  async findByName(nombres: string) {
    const fabricante_Buscar = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar_Con_Parametros,
      Fabricante,
      '',
      'fabricante_Nombre',
      nombres,
    );

    if (fabricante_Buscar == 'Error') {
      return {
        status: 400,
        message: Errores_Operaciones.ERROR_CONSULTAR,
      };
    } else {
      return {
        status: 200,
        message: fabricante_Buscar,
      };
    }
  }

  async update(id: number, updateFabricanteDto: UpdateFabricanteDto) {
    const fabricante_Actualizar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar,
      Fabricante,
      updateFabricanteDto,
      '',
      id.toString(),
    );

    if (fabricante_Actualizar == 'Error') {
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
    const fabricante_Eliminar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar_Con_Parametros,
      Fabricante,
      Estado_Logico.ELIMINADO,
      'fabricante_Estado',
      id.toString(),
    );

    if (fabricante_Eliminar == 'Error') {
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
