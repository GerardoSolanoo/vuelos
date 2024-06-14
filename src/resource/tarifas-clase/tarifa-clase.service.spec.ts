import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Exito_Operaciones,
  Errores_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Repository } from 'typeorm';
import { CreateTarifaClaseDto } from '../tarifas-clase/dto/create-tarifa-clase.dto';
import { UpdateTarifaClaseDto } from '../tarifas-clase/dto/update-tarifas-clase.dto';
import { TarifaClase } from '../tarifas-clase/entities/tarifa-clase.entity';
import { TarifaClaseService } from '../tarifas-clase/tarifas-clase.service';

describe('TarifaClaseService', () => {
  let service: TarifaClaseService;
  let tarifaClaseRepository: Repository<TarifaClase>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarifaClaseService,
        {
          provide: getRepositoryToken(TarifaClase),
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

    service = module.get<TarifaClaseService>(TarifaClaseService);
    tarifaClaseRepository = module.get<Repository<TarifaClase>>(
      getRepositoryToken(TarifaClase),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  describe('create', () => {
    it('debería crear una nueva tarifa de clase', async () => {
      const createTarifaClaseDto: CreateTarifaClaseDto = {
        tarifa_Clase_Nombre: 'Clase Económica',
        tarifa_Clase_Estado: Estado_Logico.ACTIVO,
        precioTarifa: 500,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.create(createTarifaClaseDto)).toEqual({
        status: 201,
        message: Exito_Operaciones.Crear,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        TarifaClase,
        createTarifaClaseDto,
      );
    });

    it('debería devolver un error si se produce un error en la creación', async () => {
      const createTarifaClaseDto: CreateTarifaClaseDto = {
        tarifa_Clase_Nombre: 'Clase Económica',
        tarifa_Clase_Estado: Estado_Logico.ACTIVO,
        precioTarifa: 500,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.create(createTarifaClaseDto)).toEqual({
        status: 400,
        message: Errores_Operaciones.EROR_CREAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        TarifaClase,
        createTarifaClaseDto,
      );
    });
  });

  describe('findAll', () => {
    it('debe devolver todas las tarifas de clase', async () => {
      const tarifasClase = [new TarifaClase(), new TarifaClase()];
      jest.spyOn(tarifaClaseRepository, 'find').mockResolvedValue(tarifasClase);

      expect(await service.findAll()).toEqual(tarifasClase);
      expect(tarifaClaseRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByName', () => {
    it('debe devolver tarifa de clase por su nombre', async () => {
      const nombre = 'Clase Económica';
      const tarifaClase = [new TarifaClase()];
      jest
        .spyOn(transaccionService, 'transaction')
        .mockResolvedValue(tarifaClase);

      expect(await service.findbyName(nombre)).toEqual({
        status: 200,
        message: Exito_Operaciones.Consultar,
      });

      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Consultar_Con_Parametros,
        TarifaClase,
        '',
        'tarifa_Clase_Nombre',
        nombre,
      );
    });

    it('debería devolver un error si no se encuentra la tarifa de clase', async () => {
      const nombre = 'Clase No Existente';
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.findbyName(nombre)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_CONSULTAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Consultar_Con_Parametros,
        TarifaClase,
        '',
        'tarifa_Clase_Nombre',
        nombre,
      );
    });
  });

  describe('update', () => {
    it('debe actualizar una tarifa de clase', async () => {
      const id = 1;
      const updateTarifaClaseDto: UpdateTarifaClaseDto = {
        tarifa_Clase_Nombre: 'Clase Ejecutiva',
        tarifa_Clase_Estado: Estado_Logico.ACTIVO,
        precioTarifa: 1000,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.update(id, updateTarifaClaseDto)).toEqual({
        status: 200,
        message: Exito_Operaciones.Actualizar,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar,
        TarifaClase,
        updateTarifaClaseDto,
        'tarifa_Clase_Id',
        id.toString(),
      );
    });

    it('debe devolver un error si se produce un error en la actualización', async () => {
      const id = 1;
      const updateTarifaClaseDto: UpdateTarifaClaseDto = {
        tarifa_Clase_Nombre: 'Clase Ejecutiva',
        tarifa_Clase_Estado: Estado_Logico.ACTIVO,
        precioTarifa: 1000,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.update(id, updateTarifaClaseDto)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_ACTUALIZAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar,
        TarifaClase,
        updateTarifaClaseDto,
        'tarifa_Clase_Id',
        id.toString(),
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar una tarifa de clase', async () => {
      const id = 1;
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.remove(id)).toEqual({
        status: 200,
        message: Exito_Operaciones.Eliminar,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        TarifaClase,
        Estado_Logico.ELIMINADO,
        'tarifa_Clase_Estado',
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
        TarifaClase,
        Estado_Logico.ELIMINADO,
        'tarifa_Clase_Estado',
        id.toString(),
      );
    });
  });
});
