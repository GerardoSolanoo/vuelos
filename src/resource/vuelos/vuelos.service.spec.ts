import { Test, TestingModule } from '@nestjs/testing';
import { VuelosService } from './vuelos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vuelo } from '../../resource/vuelos/entities/vuelo.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { NotFoundException } from '@nestjs/common';
import { Estado_Viaje } from '../../common/enums/estado-viaje.enum';

describe('VuelosService', () => {
  let service: VuelosService;
  let repository: Repository<Vuelo>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VuelosService,
        {
          provide: getRepositoryToken(Vuelo),
          useClass: Repository,
        },
        {
          provide: TransaccionService,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VuelosService>(VuelosService);
    repository = module.get<Repository<Vuelo>>(getRepositoryToken(Vuelo));
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo vuelo', async () => {
    const createVueloDto = {
      avion_Id: 1,
      fecha: new Date(),
      piloto_Id: 1,
      copiloto_Id: 2,
      tripulacion_ID: 3,
      horaSalida: '10:00',
      pasajerosTotales: 100,
      pasajerosApartados: 20,
      estado: Estado_Viaje.EN_CURSO,
      tarifa_Clase_Id: 1,
      tarifa_distancia_Id: 2,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.create(createVueloDto);
    expect(result).toEqual({
      status: 201,
      message: Exito_Operaciones.Crear,
    });
  });

  it('debería retornar error al crear un nuevo vuelo', async () => {
    const createVueloDto = {
      avion_Id: 1,
      fecha: new Date(),
      piloto_Id: 1,
      copiloto_Id: 2,
      tripulacion_ID: 3,
      horaSalida: '10:00',
      pasajerosTotales: 100,
      pasajerosApartados: 20,
      estado: Estado_Viaje.EN_CURSO,
      tarifa_Clase_Id: 1,
      tarifa_distancia_Id: 2,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.create(createVueloDto);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.EROR_CREAR,
    });
  });

  it('debería retornar todos los vuelos', async () => {
    const mockVuelos = [{ id: 1 }, { id: 2 }] as unknown as Vuelo[];
    jest.spyOn(repository, 'find').mockResolvedValue(mockVuelos);

    const result = await service.findAll();
    expect(result).toEqual(mockVuelos);
  });

  it('debería retornar un vuelo por id', async () => {
    const id = 1;
    const mockVuelo = { id: 1 } as unknown as Vuelo;
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockVuelo);

    const result = await service.findOne(id);
    expect(result).toEqual(mockVuelo);
  });

  it('debería lanzar NotFoundException si el vuelo no existe', async () => {
    const id = 1;
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar un vuelo existente', async () => {
    const id = 1;
    const updateVueloDto = {
      avion_Id: 1,
      fecha: new Date(),
      piloto_Id: 1,
      copiloto_Id: 2,
      tripulacion_ID: 3,
      horaSalida: '10:00',
      pasajerosTotales: 100,
      pasajerosApartados: 20,
      estado: Estado_Viaje.EN_CURSO,
      tarifa_Clase_Id: 1,
      tarifa_distancia_Id: 2,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.update(id, updateVueloDto);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Actualizar,
    });
  });

  it('debería retornar error al actualizar un vuelo', async () => {
    const id = 1;
    const updateVueloDto = {
      avion_Id: 1,
      fecha: new Date(),
      piloto_Id: 1,
      copiloto_Id: 2,
      tripulacion_ID: 3,
      horaSalida: '10:00',
      pasajerosTotales: 100,
      pasajerosApartados: 20,
      estado: Estado_Viaje.EN_CURSO,
      tarifa_Clase_Id: 1,
      tarifa_distancia_Id: 2,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.update(id, updateVueloDto);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_ACTUALIZAR,
    });
  });

  it('debería eliminar un vuelo por id', async () => {
    const id = 1;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.remove(id);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Eliminar,
    });
  });

  it('debería retornar error al eliminar un vuelo', async () => {
    const id = 1;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.remove(id);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_ELIMINAR,
    });
  });
});
