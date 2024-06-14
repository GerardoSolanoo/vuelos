import { Test, TestingModule } from '@nestjs/testing';
import { ViajesService } from './viajes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viaje } from './entities/viaje.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { NotFoundException } from '@nestjs/common';
import { Ubicacion } from '../ubicaciones/entities/ubicacion.entity';
import { Estado_Viaje } from '../../common/enums/estado-viaje.enum';

describe('ViajesService', () => {
  let service: ViajesService;
  let viajeRepository: Repository<Viaje>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let ubiRepository: Repository<Ubicacion>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViajesService,
        {
          provide: getRepositoryToken(Viaje),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Ubicacion),
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

    service = module.get<ViajesService>(ViajesService);
    viajeRepository = module.get<Repository<Viaje>>(getRepositoryToken(Viaje));
    ubiRepository = module.get<Repository<Ubicacion>>(
      getRepositoryToken(Ubicacion),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo viaje', async () => {
    const createViajeDto = {
      fechaSalida: new Date(),
      fechaLlegada: new Date(),
      estadoViaje: Estado_Viaje.POR_INICIAR,
      numeroAvion: 75,
      aeropuertoDestino: 7,
      aeropuertoOrigen: 27,
      vueloId: 6,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.create(createViajeDto);
    expect(result).toEqual({
      status: 201,
      message: Exito_Operaciones.Crear,
    });
  });

  it('debería retornar error al crear un nuevo viaje', async () => {
    const createViajeDto = {
      fechaSalida: new Date(),
      fechaLlegada: new Date(),
      estadoViaje: Estado_Viaje.POR_INICIAR,
      numeroAvion: 75,
      aeropuertoDestino: 7,
      aeropuertoOrigen: 27,
      vueloId: 6,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.create(createViajeDto);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.EROR_CREAR,
    });
  });

  it('debería retornar todos los viajes', async () => {
    const mockViajes = [{ id: 1 }, { id: 2 }] as unknown as Viaje[];
    jest.spyOn(viajeRepository, 'find').mockResolvedValue(mockViajes);

    const result = await service.findAll();
    expect(result).toEqual(mockViajes);
  });

  it('debería retornar un viaje por id', async () => {
    const id = 1;
    const mockViaje = { id: 1 } as unknown as Viaje;
    jest.spyOn(viajeRepository, 'findOne').mockResolvedValue(mockViaje);

    const result = await service.findOne(id);
    expect(result).toEqual(mockViaje);
  });

  it('debería lanzar NotFoundException si el viaje no existe', async () => {
    const id = 1;
    jest.spyOn(viajeRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar un viaje existente', async () => {
    const id = 1;
    const updateViajeDto = {
      fechaSalida: new Date(),
      fechaLlegada: new Date(),
      estadoViaje: Estado_Viaje.POR_INICIAR,
      numeroAvion: 75,
      aeropuertoDestino: 7,
      aeropuertoOrigen: 27,
      vueloId: 6,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.update(id, updateViajeDto);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Actualizar,
    });
  });

  it('debería retornar error al actualizar un viaje', async () => {
    const id = 1;
    const updateViajeDto = {
      fechaSalida: new Date(),
      fechaLlegada: new Date(),
      estadoViaje: Estado_Viaje.POR_INICIAR,
      numeroAvion: 75,
      aeropuertoDestino: 7,
      aeropuertoOrigen: 27,
      vueloId: 6,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.update(id, updateViajeDto);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_ACTUALIZAR,
    });
  });

  it('debería eliminar un viaje por id', async () => {
    const id = 1;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.remove(id);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Eliminar,
    });
  });

  it('debería retornar error al eliminar un viaje', async () => {
    const id = 1;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.remove(id);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_ELIMINAR,
    });
  });
});
