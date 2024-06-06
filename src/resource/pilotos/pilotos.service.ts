import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePilotoDto } from './dto/create-piloto.dto';
import { UpdatePilotoDto } from './dto/update-piloto.dto';
import { Piloto } from './entities/piloto.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';

@Injectable()
export class PilotosService {
  private readonly logger = new Logger('PilotosService');

  constructor(
    @InjectRepository(Piloto)
    private readonly pilotosRepository: Repository<Piloto>,
    private transaccionService: TransaccionService,
  ) {}

  async create(createPilotosDto: CreatePilotoDto) {
    const piloto_Crear = await this.transaccionService.transaction(
      Tipo_Transaccion.Guardar,
      Piloto,
      createPilotosDto,
    );

    if (piloto_Crear === 'Error') {
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
    return await this.pilotosRepository.find();
  }

  async findbyName(nombre: string) {
    const piloto_Buscar = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar_Con_Parametros,
      Piloto,
      '',
      'piloto_Nombre',
      nombre,
    );

    if (!piloto_Buscar) {
      return null;
    }

    return {
      status: 200,
      message: Exito_Operaciones.Consultar,
    };
  }

  async update(id: number, updatePilotoDto: UpdatePilotoDto) {
    const piloto_Actualizar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar,
      Piloto,
      updatePilotoDto,
      '',
      id.toString(),
    );

    if (piloto_Actualizar === 'Error') {
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
    const piloto_Eliminar = await this.transaccionService.transaction(
      Tipo_Transaccion.Actualizar_Con_Parametros,
      Piloto,
      Estado_Logico.ELIMINADO,
      'piloto_Id',
      id.toString(),
    );

    if (piloto_Eliminar === 'Error') {
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
