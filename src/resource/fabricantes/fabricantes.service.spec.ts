import { Test, TestingModule } from '@nestjs/testing';
import { FabricantesService } from './fabricantes.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fabricante } from './entities/fabricante.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { CreateFabricanteDto } from './dto/create-fabricante.dto';
import { UpdateFabricanteDto } from './dto/update-fabricante.dto';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';

describe('FabricantesService', () => {
  let service: FabricantesService;
  let fabricanteRepository: Repository<Fabricante>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FabricantesService,
        {
          provide: getRepositoryToken(Fabricante),
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

    service = module.get<FabricantesService>(FabricantesService);
    fabricanteRepository = module.get<Repository<Fabricante>>(
      getRepositoryToken(Fabricante),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  describe('create', () => {
    it('deberia crear un nuevo fabricante', async () => {
      const createFabricanteDto: CreateFabricanteDto = {
        fabricante_Nombre: 'Airbus',
        fabricante_Descripcion: 'Fabricante fabrica',
        fabricante_Telefono: '271 256 78 21',
        fabricante_Email: 'mar@example.com',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.create(createFabricanteDto)).toEqual({
        status: 200,
        message: Exito_Operaciones.Crear,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        Fabricante,
        createFabricanteDto,
      );
    });

    it('debería devolver un error si se produce un error en la creación', async () => {
      const createFabricanteDto: CreateFabricanteDto = {
        fabricante_Nombre: 'Nombre de prueba',
        fabricante_Descripcion: 'Descripción de prueba',
        fabricante_Telefono: '2712785642',
        fabricante_Email: 'fabricante@example.com',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.create(createFabricanteDto)).toEqual({
        status: 400,
        message: Errores_Operaciones.EROR_CREAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        Fabricante,
        createFabricanteDto,
      );
    });
  });

  describe('findAll', () => {
    it('debe devolver todos los fabricantes', async () => {
      const fabricantes = [new Fabricante(), new Fabricante()];
      jest.spyOn(fabricanteRepository, 'find').mockResolvedValue(fabricantes);

      expect(await service.findAll()).toEqual(fabricantes);
      expect(fabricanteRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByName', () => {
    it('debe devolver fabricante por su nombre', async () => {
      const nombre = 'ExampleName';
      const fabricante = [new Fabricante()];
      jest
        .spyOn(transaccionService, 'transaction')
        .mockResolvedValue(fabricante);

      expect(await service.findByName(nombre)).toEqual({
        status: 200,
        message: fabricante,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Consultar_Con_Parametros,
        Fabricante,
        '',
        'fabricante_Nombre',
        nombre,
      );
    });

    it('debería devolver un error si no se encuentra el fabricante', async () => {
      const nombre = 'NonExistentName';
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.findByName(nombre)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_CONSULTAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Consultar_Con_Parametros,
        Fabricante,
        '',
        'fabricante_Nombre',
        nombre,
      );
    });
  });
  describe('handleDBExceptions', () => {
    it('debería manejar excepciones de base de datos correctamente', () => {
      const errorMock = new Error('Simulated database error');

      const loggerSpy = jest
        .spyOn(service['logger'], 'error')
        .mockImplementation();

      expect(() => service['handleDBExceptions'](errorMock)).toThrowError(
        'Unexpected error occurred',
      );

      expect(loggerSpy).toHaveBeenCalledWith(errorMock);
    });
  });
  describe('update', () => {
    it('debe actualizar un fabricante', async () => {
      const id = 1;
      const updateFabricanteDto: UpdateFabricanteDto = {
        fabricante_Nombre: 'Nombre actualizado',
        fabricante_Descripcion: 'Descripción actualizada',
        fabricante_Telefono: '271456789',
        fabricante_Email: 'update@example.com',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.update(id, updateFabricanteDto)).toEqual({
        status: 200,
        message: Exito_Operaciones.Actualizar,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar,
        Fabricante,
        updateFabricanteDto,
        '',
        id.toString(),
      );
    });

    it('debe devolver un error si se produce un error en la actualización', async () => {
      const id = 1;
      const updateFabricanteDto: UpdateFabricanteDto = {
        fabricante_Nombre: 'Nombre actualizado',
        fabricante_Descripcion: 'Descripción actualizada',
        fabricante_Telefono: '271828277336',
        fabricante_Email: 'update@example.com',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.update(id, updateFabricanteDto)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_ACTUALIZAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar,
        Fabricante,
        updateFabricanteDto,
        '',
        id.toString(),
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar un fabricante', async () => {
      const id = 1;
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.remove(id)).toEqual({
        status: 200,
        message: Exito_Operaciones.Eliminar,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        Fabricante,
        Estado_Logico.ELIMINADO,
        'fabricante_Estado',
        id.toString(),
      );
    });

    it('debería devolver un error si se produce un error en la eliminación', async () => {
      const id = 1;
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.remove(id)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_ELIMINAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        Fabricante,
        Estado_Logico.ELIMINADO,
        'fabricante_Estado',
        id.toString(),
      );
    });
  });
});
