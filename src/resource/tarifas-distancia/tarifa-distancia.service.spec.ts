import { Test, TestingModule } from '@nestjs/testing';
import { TarifaDistanciaService } from './tarifa-distancia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TarifaDistancia } from './entities/tarifa-distancia.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';

describe('TarifaDistanciaService', () => {
  let service: TarifaDistanciaService;
  let repository: Repository<TarifaDistancia>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarifaDistanciaService,
        {
          provide: getRepositoryToken(TarifaDistancia),
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

    service = module.get<TarifaDistanciaService>(TarifaDistanciaService);
    repository = module.get<Repository<TarifaDistancia>>(
      getRepositoryToken(TarifaDistancia),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una nueva tarifa de distancia', async () => {
    const createTarifaDistanciaDto = {
      tarifa_Distancia_Nombre: 'test',
      origenId: 1,
      destinoId: 2,
      distancia: 100,
      tarifa_Distancia_Estado: Estado_Logico.ACTIVO,
      precioTarifa: 50,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.create(createTarifaDistanciaDto);
    expect(result).toEqual({
      status: 201,
      message: Exito_Operaciones.Crear,
    });
  });

  it('debería retornar error al crear una nueva tarifa de distancia', async () => {
    const createTarifaDistanciaDto = {
      tarifa_Distancia_Nombre: 'test',
      origenId: 1,
      destinoId: 2,
      distancia: 100,
      tarifa_Distancia_Estado: Estado_Logico.ACTIVO,
      precioTarifa: 50,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.create(createTarifaDistanciaDto);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.EROR_CREAR,
    });
  });

  it('debería retornar todas las tarifas de distancia', async () => {
    const mockTarifas = [{ id: 1 }, { id: 2 }] as unknown as TarifaDistancia[];
    jest.spyOn(repository, 'find').mockResolvedValue(mockTarifas);

    const result = await service.findAll();
    expect(result).toEqual(mockTarifas);
  });

  it('debería buscar tarifas de distancia por nombre', async () => {
    const nombre = 'test';
    const mockResult = [{ id: 1 }] as any;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue(mockResult);

    const result = await service.findbyName(nombre);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Consultar,
    });
  });

  it('debería retornar error al buscar tarifas de distancia por nombre', async () => {
    const nombre = 'test';
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.findbyName(nombre);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_CONSULTAR,
    });
  });

  it('debería actualizar una tarifa de distancia existente', async () => {
    const id = 1;
    const updateTarifaDistanciaDto = {
      tarifa_Distancia_Nombre: 'updated',
      origenId: 1,
      destinoId: 2,
      distancia: 200,
      tarifa_Distancia_Estado: Estado_Logico.ACTIVO,
      precioTarifa: 60,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.update(id, updateTarifaDistanciaDto);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Actualizar,
    });
  });

  it('debería retornar error al actualizar una tarifa de distancia', async () => {
    const id = 1;
    const updateTarifaDistanciaDto = {
      tarifa_Distancia_Nombre: 'updated',
      origenId: 1,
      destinoId: 2,
      distancia: 200,
      tarifa_Distancia_Estado: Estado_Logico.ACTIVO,
      precioTarifa: 60,
    };
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.update(id, updateTarifaDistanciaDto);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_ACTUALIZAR,
    });
  });

  it('debería eliminar una tarifa de distancia por id', async () => {
    const id = 1;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

    const result = await service.remove(id);
    expect(result).toEqual({
      status: 200,
      message: Exito_Operaciones.Eliminar,
    });
  });

  it('debería retornar error al eliminar una tarifa de distancia', async () => {
    const id = 1;
    jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

    const result = await service.remove(id);
    expect(result).toEqual({
      status: 400,
      message: Errores_Operaciones.ERROR_ELIMINAR,
    });
  });
});
