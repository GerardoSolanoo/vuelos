import { Connection, DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TrabajadoresService } from '../trabajadores/trabajadores.service';
import { UbicacionesService } from '../ubicaciones/ubicaciones.service';
import { AvionesService } from '../aviones/aviones.service';
import { AeropuertosService } from '../aeropuertos/aeropuertos.service';
import { TripulacionesService } from '../tripulaciones/tripulaciones.service';
import { VuelosService } from '../vuelos/vuelos.service';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';
import { registrarAeropuertos } from './data/seed-aeropuerto';

import {
  initialTarifasDistancia,
  initialTrabajadores,
  initialUbicaciones,
} from './data/seeds';
import { TarifaDistanciaService } from '../tarifas-distancia/tarifa-distancia.service';
import { Ubicacion } from '../ubicaciones/entities/ubicacion.entity';
import { Aeropuerto } from '../aeropuertos/entities/aeropuerto.entity';
import { Fabricante } from '../fabricantes/entities/fabricante.entity';
import { ModeloAvion } from '../modelos/entities/modelo-avion.entity';
import { registrarAviones } from './data/seed-aviones';
import { Avion } from '../aviones/entities/avion.entity';
import { registrarFabricantes } from './data/seed-fabricante';
import { registrarModelosAvion } from './data/seed-modelo';
import { registrar_Pilotos } from './data/seed-pilotos';
import { Piloto } from '../pilotos/entities/piloto.entity';
import { registrar_Tarifa_Clase } from './data/seed-tarifaClase';
import { TarifaClase } from '../tarifas-clase/entities/tarifa-clase.entity';
import { Tripulacion } from '../tripulaciones/entities/tripulacion.entity';
import { Trabajador } from '../trabajadores/entities/trabajador.entity';
import { registrarTripulacion } from './data/seed-tripulaciones';
import { TarifaDistancia } from '../tarifas-distancia/entities/tarifa-distancia.entity';
import { registrar_Vuelos } from './data/seed-vuelos';
import { Vuelo } from '../vuelos/entities/vuelo.entity';
import { Viaje } from '../viajes/entities/viaje.entity';
import { registrarViajes } from './data/seed-viajes';

interface actualizar {
  ID_Tripulacion: number;
  trabajadores: number[];
}

@Injectable()
export class SeedService {
  constructor(
    private readonly trabajadoresService: TrabajadoresService,
    private readonly ubicacionesService: UbicacionesService,
    private readonly tripulacionesService: TripulacionesService,
    private readonly tarifasDistanciaService: TarifaDistanciaService,
    public transaccionService: TransaccionService,
  ) {}

  async runSeed() {
    await this.insertTrabajadores();
    await this.insertUbicaciones();
    await this.insertFabricantes();
    await this.insertModelos();
    await this.insertPilotos();
    await this.insertAviones();
    await this.insertAeropuertos();
    await this.insertTarifasClase();
    await this.insertTarifasDistancia();
    await this.insertTripulaciones();
    await this.insertVuelos();
    await this.insertViajes();
    return 'SEED EXECUTED';
  }

  private async insertTrabajadores() {
    const trabajadores = initialTrabajadores.trabajadores;

    const insertPromises = [];

    trabajadores.forEach(async (trabajador) => {
      insertPromises.push(await this.trabajadoresService.create(trabajador));
    });
  }

  private async insertUbicaciones() {
    const ubicaciones = initialUbicaciones.ubicaciones;

    const insertPromises = [];

    ubicaciones.forEach(async (ubicacion) => {
      insertPromises.push(await this.ubicacionesService.create(ubicacion));
    });
  }

  async insertFabricantes() {
    const fabricantes_Creados = registrarFabricantes();

    fabricantes_Creados.forEach(async (fabricante) => {
      console.log(fabricante);
      await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Fabricante,
        fabricante,
      );
      console.log(
        await this.transaccionService.transaction(
          Tipo_Transaccion.Guardar,
          Fabricante,
          fabricante,
        ),
      );
    });
  }

  async insertPilotos() {
    const pilotos = registrar_Pilotos();

    pilotos.forEach(async (piloto) => {
      await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Piloto,
        piloto,
      );
    });
  }

  async insertAviones() {
    const fabricantes_Array = await this.consultar_Fabricantes();

    const modelos_Array = await this.consultar_Modelos();

    const aviones_Creados = registrarAviones(fabricantes_Array, modelos_Array);

    aviones_Creados.forEach(async (avion) => {
      await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Avion,
        avion,
      );
    });
  }

  async insertAeropuertos() {
    const ubicaciones_Array = await this.consultar_Ubicaciones();

    const aeropuertos: any = registrarAeropuertos(ubicaciones_Array);

    aeropuertos.forEach(async (aeropuerto) => {
      await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Aeropuerto,
        aeropuerto,
      );
    });
  }

  async insertTripulaciones() {
    const trabajadores_Array = await this.consultar_Trabajadores();

    const tripulaciones = await registrarTripulacion(trabajadores_Array);

    const tripulacionID: actualizar[] = [];

    for (let i = 0; i < tripulaciones.length; i++) {
      const resultado: any = await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Tripulacion,
        tripulaciones[i],
      );
      const objeto = {
        ID_Tripulacion: resultado.resultado.tripulacion_ID,
        trabajadores: resultado.resultado.trabajadores,
      };
      tripulacionID.push(objeto);
    }

    for (let i = 0; i < tripulacionID.length; i++) {
      for (let j = 0; j < tripulacionID[i].trabajadores.length; j++) {
        await this.transaccionService.transaction(
          Tipo_Transaccion.Actualizar_Con_Parametros,
          Trabajador,
          tripulacionID[i].ID_Tripulacion,
          'tripulacion_ID',
          tripulacionID[i].trabajadores[j].toString(),
        );
      }
    }
  }

  async insertTarifasClase() {
    const tarifasClase = registrar_Tarifa_Clase();

    tarifasClase.forEach(
      async (tarifaClase) =>
        await this.transaccionService.transaction(
          Tipo_Transaccion.Guardar,
          TarifaClase,
          tarifaClase,
        ),
    );
  }

  private async insertTarifasDistancia() {
    const tarifasDistancia = initialTarifasDistancia.tarifasDistancia;

    const insertPromises = [];

    tarifasDistancia.forEach((tarifaDistancia) => {
      insertPromises.push(this.tarifasDistanciaService.create(tarifaDistancia));
    });
  }

  async insertModelos() {
    const modelos = registrarModelosAvion();

    modelos.forEach(
      async (modelo) =>
        await this.transaccionService.transaction(
          Tipo_Transaccion.Guardar,
          ModeloAvion,
          modelo,
        ),
    );
  }

  async insertVuelos() {
    const array_Pilotos = await this.consultar_Pilotos();

    const array_Tripulacion = await this.consultar_Triuplacion();

    const array_Tarifa_Clase = await this.consultar_Tarifa_Clase();

    const array_Tarifa_Distancia = await this.consultar_Tarifa_Distancia();

    const array_Aviones = await this.consultar_Aviones();

    const vuelos = registrar_Vuelos(
      array_Pilotos,
      array_Tripulacion,
      array_Tarifa_Clase,
      array_Tarifa_Distancia,
      array_Aviones,
    );

    vuelos.forEach(
      async (vuelo) =>
        await this.transaccionService.transaction(
          Tipo_Transaccion.Guardar,
          Vuelo,
          vuelo,
        ),
    );
  }

  async insertViajes() {
    const array_Aviones = await this.consultar_Aviones();
    const array_Aeropuertos = await this.consultar_Aeropuertos();
    const array_Vuelos = await this.consultar_Vuelos();

    const viajes = await registrarViajes(
      array_Aviones,
      array_Aeropuertos,
      array_Vuelos,
    );

    const insertPromises = viajes.map(async (viaje) => {
      await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Viaje,
        viaje,
      );
    });

    await Promise.all(insertPromises);
  }

  private async consultar_Ubicaciones() {
    const ubicaciones: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Ubicacion,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < ubicaciones.length; i++) {
      array_ID.push(ubicaciones[i].ubicacion_Id);
    }

    return array_ID;
  }

  private async consultar_Fabricantes() {
    const fabricantes: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Fabricante,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < fabricantes.length; i++) {
      array_ID.push(fabricantes[i].fabricante_Id);
    }

    return array_ID;
  }

  async consultar_Tripulacion() {
    const tripulaciones: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Tripulacion,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < tripulaciones.length; i++) {
      array_ID.push(tripulaciones[i]);
    }

    return array_ID;
  }

  async consultar_Aeropuertos() {
    const aeropuertos: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Aeropuerto,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < aeropuertos.length; i++) {
      array_ID.push(aeropuertos[i]);
    }

    return array_ID;
  }

  async consultar_Vuelos() {
    const vuelos: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Vuelo,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < vuelos.length; i++) {
      array_ID.push(vuelos[i]);
    }

    return array_ID;
  }

  private async consultar_Modelos() {
    const modelos: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      ModeloAvion,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < modelos.length; i++) {
      array_ID.push(modelos[i].modelo_Avion_Id);
    }

    return array_ID;
  }

  async consultar_Trabajadores() {
    const trabajadores: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Trabajador,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < trabajadores.length; i++) {
      array_ID.push(trabajadores[i].id);
    }

    return array_ID;
  }

  async consultar_Triuplacion() {
    const tripulaciones: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Tripulacion,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < tripulaciones.length; i++) {
      array_ID.push(tripulaciones[i]);
    }

    return array_ID;
  }

  async consultar_Tarifa_Clase() {
    const tarifa_Clase: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      TarifaClase,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < tarifa_Clase.length; i++) {
      array_ID.push(tarifa_Clase[i].tarifa_Clase_Id);
    }

    return array_ID;
  }

  async consultar_Tarifa_Distancia() {
    const tarifa_Distancia: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      TarifaDistancia,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < tarifa_Distancia.length; i++) {
      array_ID.push(tarifa_Distancia[i].tarifa_distancia_Id);
    }

    return array_ID;
  }

  async consultar_Pilotos() {
    const pilotos: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Piloto,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < pilotos.length; i++) {
      array_ID.push(pilotos[i].piloto_Id);
    }

    return array_ID;
  }

  async consultar_Aviones() {
    const aviones: any = await this.transaccionService.transaction(
      Tipo_Transaccion.Consultar,
      Avion,
      '',
    );

    const array_ID = [];

    for (let i = 0; i < aviones.length; i++) {
      array_ID.push(aviones[i]);
    }

    return array_ID;
  }
}
