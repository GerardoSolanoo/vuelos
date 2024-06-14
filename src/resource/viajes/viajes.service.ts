import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { Viaje } from './entities/viaje.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import { Ubicacion } from '../ubicaciones/entities/ubicacion.entity';
import { Estado_Viaje } from '../../common/enums/estado-viaje.enum';

@Injectable()
export class ViajesService {
  private readonly logger = new Logger('ViajesService');

  constructor(
    private transaccionService: TransaccionService,
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
    @InjectRepository(Ubicacion)
    private readonly ubiRepository: Repository<Ubicacion>,
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

  async findVueloByViajes(
    destino: string,
    origen: string,
    fecha_salida?: string,
  ) {
    const destinoObj = await this.ubiRepository.findOneBy({
      ubicacion_Nombre: destino,
    });
    const origObj = await this.ubiRepository.findOneBy({
      ubicacion_Nombre: origen,
    });
    let dateStart = new Date();
    let dateEnd = new Date();

    if (fecha_salida) {
      const [day, month, year] = fecha_salida
        .split('/')
        .map((part) => parseInt(part, 10));
      dateStart = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      dateEnd = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
    }
    console.log(dateStart);
    console.log(dateEnd);

    const viajes = await this.viajeRepository.find({
      order: { fechaSalida: 'ASC' },
      where: {
        estadoViaje: Estado_Viaje.POR_INICIAR,
        fechaSalida: fecha_salida
          ? Between(dateStart.toUTCString(), dateEnd.toUTCString())
          : undefined,
        aeropuertoDestino: { aeropuerto_Ubicacion: destinoObj.ubicacion_Id },
        aeropuertoOrigen: { aeropuerto_Ubicacion: origObj.ubicacion_Id },
        vueloId: {
          estado: Estado_Viaje.POR_INICIAR,
        },
      },
    });

    const resp = viajes.map((v) => {
      return {
        Viaje_ID: v.Viaje_ID,
        fechaSalida: new Date(v.fechaSalida).toLocaleDateString(),
        hora_Salida: new Date(v.fechaSalida).toLocaleTimeString(),

        fechaLlegada: new Date(v.fechaLlegada).toLocaleDateString(),
        hora_Llegada: new Date(v.fechaLlegada).toLocaleTimeString(),

        estadoViaje: v.estadoViaje,
        aeropuertoDestino: v.aeropuertoDestino,
        aeropuertoOrigen: v.aeropuertoOrigen,
        asientosdisponibles: v.calculLugaresDisponoibles(),
        tarifas_clases: v.tarifas_clase.map((t) => t.tarfa_clase),
        tarifas_distancia: v.tarifas_distancia.map((t) => t.tarfa_distancia),
      };
    });

    return resp;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    throw new Error('Unexpected error occurred');
  }
}
