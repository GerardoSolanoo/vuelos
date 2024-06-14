import { Test, TestingModule } from '@nestjs/testing';
import { ModelosService } from './modelos.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModeloAvion } from './entities/modelo-avion.entity';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { CreateModeloAvionDto } from './dto/create-modelo-avion.dto';
import { UpdateModeloAvionDto } from './dto/update-modelo-avion.dto';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Errores_Operaciones,
  Exito_Operaciones,
} from '../../common/helpers/operaciones.helpers';
import { Estado_Logico } from '../../common/enums/estado_logico.enum';
import { CategoriaModelo } from '../../common/enums/categoria-modelo.enum';
import { ESTADO_OPERATIVO } from '../../common/enums/estado-operativo.enum';

describe('ModelosService', () => {
  let service: ModelosService;
  let modeloRepository: Repository<ModeloAvion>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelosService,
        {
          provide: getRepositoryToken(ModeloAvion),
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

    service = module.get<ModelosService>(ModelosService);
    modeloRepository = module.get<Repository<ModeloAvion>>(
      getRepositoryToken(ModeloAvion),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  describe('create', () => {
    it('debería crear un nuevo modelo de avión', async () => {
      const createModeloDto: CreateModeloAvionDto = {
        modelo_Avion_Nombre: 'Boeing 747',
        modelo_Avion_Estado: ESTADO_OPERATIVO.OPERATIVO,
        modelo_Avion_Categoria: CategoriaModelo.COMERCIAL,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.create(createModeloDto)).toEqual({
        status: 200,
        message: 'Modelo creado con éxito',
        modelo: 'Éxito',
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        ModeloAvion,
        createModeloDto,
      );
    });

    it('debería devolver un error si ocurre un error al crear', async () => {
      const createModeloDto: CreateModeloAvionDto = {
        modelo_Avion_Nombre: 'Nombre de prueba',
        modelo_Avion_Estado: ESTADO_OPERATIVO.OPERATIVO,
        modelo_Avion_Categoria: CategoriaModelo.COMERCIAL,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.create(createModeloDto)).toEqual({
        status: 400,
        message: 'Error al crear el modelo',
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        ModeloAvion,
        createModeloDto,
      );
    });

    describe('findAll', () => {
      it('debería devolver todos los modelos de avión', async () => {
        const modelos = [new ModeloAvion(), new ModeloAvion()];
        jest.spyOn(modeloRepository, 'find').mockResolvedValue(modelos);

        expect(await service.findAll()).toEqual(modelos);
        expect(modeloRepository.find).toHaveBeenCalled();
      });
    });
  });

  describe('findByName', () => {
    it('debería devolver el modelo de avión por su nombre', async () => {
      const nombre = 'Boeing 747';
      const modelo = [new ModeloAvion()];
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue(modelo);

      expect(await service.findByName(nombre)).toEqual({
        status: 200,
        message: modelo,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Consultar_Con_Parametros,
        ModeloAvion,
        '',
        'modelo_Avion_Nombre',
        nombre,
      );
    });

    it('debería devolver un error si el modelo de avión no se encuentra', async () => {
      const nombre = 'NonExistentName';
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.findByName(nombre)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_CONSULTAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Consultar_Con_Parametros,
        ModeloAvion,
        '',
        'modelo_Avion_Nombre',
        nombre,
      );
    });
  });

  describe('update', () => {
    it('debería actualizar un modelo de avión', async () => {
      const id = 1;
      const updateModeloDto: UpdateModeloAvionDto = {
        modelo_Avion_Nombre: 'Boeing 747 Actualizado',
        modelo_Avion_Estado: ESTADO_OPERATIVO.MANTENIMIENTO,
        modelo_Avion_Categoria: CategoriaModelo.MILITAR,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.update(id, updateModeloDto)).toEqual({
        status: 200,
        message: Exito_Operaciones.Actualizar,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        ModeloAvion,
        updateModeloDto,
        'modelo_Avion_Id',
        id.toString(),
      );
    });

    it('debería devolver un error si ocurre un error al actualizar', async () => {
      const id = 1;
      const updateModeloDto: UpdateModeloAvionDto = {
        modelo_Avion_Nombre: 'MAR Actualizado',
        modelo_Avion_Estado: ESTADO_OPERATIVO.MANTENIMIENTO,
        modelo_Avion_Categoria: CategoriaModelo.MILITAR,
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.update(id, updateModeloDto)).toEqual({
        status: 400,
        message: Errores_Operaciones.ERROR_ACTUALIZAR,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        ModeloAvion,
        updateModeloDto,
        'modelo_Avion_Id',
        id.toString(),
      );
    });
  });
  describe('remove', () => {
    it('debería eliminar un modelo de avión', async () => {
      const id = 1;
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      expect(await service.remove(id)).toEqual({
        status: 200,
        message: 'Modelo eliminado con éxito',
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        ModeloAvion,
        Estado_Logico.ELIMINADO,
        'modelo_Avion_Estado',
        id.toString(),
      );
    });

    it('debería devolver un error si ocurre un error al eliminar', async () => {
      const id = 1;
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      expect(await service.remove(id)).toEqual({
        status: 400,
        message: 'Error al eliminar el modelo',
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        ModeloAvion,
        Estado_Logico.ELIMINADO,
        'modelo_Avion_Estado',
        id.toString(),
      );
    });
  });
});
