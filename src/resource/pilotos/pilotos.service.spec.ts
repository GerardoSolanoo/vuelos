import { TestingModule, Test } from '@nestjs/testing';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Repository } from 'typeorm';
import { Piloto } from './entities/piloto.entity';
import { PilotosService } from './pilotos.service';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';

describe('PilotosService', () => {
  let service: PilotosService;
  let repository: Repository<Piloto>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PilotosService,
        {
          provide: 'PilotoRepository',
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

    service = module.get<PilotosService>(PilotosService);
    repository = module.get('PilotoRepository');
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new piloto', async () => {
      const createPilotoDto = {
        piloto_Nombre: 'John',
        piloto_Apellidos: 'Doe',
        piloto_Telefono: '+123456789',
        piloto_Correo_Electronico: 'john.doe@example.com',
        piloto_Licencia_Piloto: '1234567890',
        piloto_Fecha_Nacimiento: new Date('1990-01-01'),
        piloto_Nacionalidad: 'USA',
        piloto_Horas_Vuelo: 1000,
        piloto_Certificaciones: ['Certificación 1', 'Certificación 2'],
        piloto_Fecha_Expedicion_Licencia: new Date('2020-01-01'),
        piloto_Estado_Logico: Estado_Logico.ACTIVO,
      };

      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      const result = await service.create(createPilotoDto);

      expect(result).toEqual({
        status: 200,
        message: Exito_Operaciones.Crear,
      });
    });

    it('should return an error when creating a piloto fails', async () => {
      const createPilotoDto = {
        piloto_Nombre: 'John',
        piloto_Apellidos: 'Doe',
        piloto_Telefono: '+123456789',
        piloto_Correo_Electronico: 'john.doe@example.com',
        piloto_Licencia_Piloto: '1234567890',
        piloto_Fecha_Nacimiento: new Date('1990-01-01'),
        piloto_Nacionalidad: 'USA',
        piloto_Horas_Vuelo: 1000,
        piloto_Certificaciones: ['Certificación 1', 'Certificación 2'],
        piloto_Fecha_Expedicion_Licencia: new Date('2020-01-01'),
        piloto_Estado_Logico: Estado_Logico.ACTIVO,
      };

      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      const result = await service.create(createPilotoDto);

      expect(result).toEqual({
        status: 400,
        message: Errores_Operaciones.EROR_CREAR,
      });
    });
  });

  describe('findAll', () => {
    it('should return all pilotos', async () => {
      const findAllResult: Piloto[] = [
        {
          piloto_Id: 1,
          piloto_Nombre: 'John',
          piloto_Apellidos: 'Doe',
          piloto_Telefono: '+123456789',
          piloto_Correo_Electronico: 'john.doe@example.com',
          piloto_Licencia_Piloto: '1234567890',
          piloto_Fecha_Nacimiento: new Date('1990-01-01'),
          piloto_Nacionalidad: 'USA',
          piloto_Horas_Vuelo: 1000,
          piloto_Certificaciones: ['Certificación 1', 'Certificación 2'],
          piloto_Fecha_Expedicion_Licencia: new Date('2020-01-01'),
          piloto_Estado_Logico: Estado_Logico.ACTIVO,
          vuelo_Id: null,
          copiloto_Id: null,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(findAllResult);

      const result = await service.findAll();

      expect(result).toEqual(findAllResult);
    });
  });

  describe('update', () => {
    it('should update a piloto', async () => {
      const pilotoId = 1;
      const updatePilotoDto = {
        piloto_Nombre: 'John',
        piloto_Apellidos: 'Doe',
      };

      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      const result = await service.update(pilotoId, updatePilotoDto);

      expect(result).toEqual({
        status: 200,
        message: Exito_Operaciones.Actualizar,
      });
    });

    it('should return an error when updating a piloto fails', async () => {
      const pilotoId = 1;
      const updatePilotoDto = {
        piloto_Nombre: 'John',
        piloto_Apellidos: 'Doe',
      };

      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      const result = await service.update(pilotoId, updatePilotoDto);

      expect(result).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_ACTUALIZAR,
      });
    });
  });

  describe('remove', () => {
    it('should remove a piloto', async () => {
      const pilotoId = 1;

      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      const result = await service.remove(pilotoId);

      expect(result).toEqual({
        status: 200,
        message: Exito_Operaciones.Eliminar,
      });
    });

    it('should return an error when removing a piloto fails', async () => {
      const pilotoId = 1;

      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      const result = await service.remove(pilotoId);

      expect(result).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_ELIMINAR,
      });
    });
  });

  describe('other', () => {
    it('should return null if no piloto is found', async () => {
      const pilotoName = 'Non-existent Piloto';
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue(null);

      const result = await service.findbyName(pilotoName);

      expect(result).toBeNull();
    });
  });
});
