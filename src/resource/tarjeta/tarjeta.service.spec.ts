import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TarjetaService } from './tarjeta.service';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Tarjeta } from './entities/tarjeta.entity';
import { CreateTarjetaDto } from './dto/create-tarjeta.dto';
import { UpdateTarjetaDto } from './dto/update-tarjeta.dto';
import {
  Error_Tarjeta,
  Exito_Tarjetas,
} from '../../common/helpers/tarjetas.helpers';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import { Tarjeta_Estado } from '../../common/enums/tarjeta.enum';

describe('TarjetaService', () => {
  let service: TarjetaService;
  let tarjetaRepository: Repository<Tarjeta>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarjetaService,
        {
          provide: getRepositoryToken(Tarjeta),
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

    service = module.get<TarjetaService>(TarjetaService);
    tarjetaRepository = module.get<Repository<Tarjeta>>(
      getRepositoryToken(Tarjeta),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  //Autenticar por usuario primero para relacionarlo
  describe('create', () => {
    it('should create a new tarjeta', async () => {
      const createTarjetaDto: CreateTarjetaDto = {
        tarjeta_Titular: 'Juan Perez',
        tarjeta_Direccion: 'Calle 123',
        tarjeta_Numero_Tarjeta: '1234567890123456',
        tarjeta_Fecha_Vencimiento: '12/25',
        tarjeta_CVV: '123',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      const result = await service.create(createTarjetaDto);

      expect(result).toEqual({
        status: 201,
        message: Exito_Tarjetas,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Guardar,
        Tarjeta,
        createTarjetaDto,
      );
    });

    it('should return an error if creation fails', async () => {
      const createTarjetaDto: CreateTarjetaDto = {
        tarjeta_Titular: 'Juan Perez',
        tarjeta_Direccion: 'Calle 123',
        tarjeta_Numero_Tarjeta: '1234567890123456',
        tarjeta_Fecha_Vencimiento: '12/25',
        tarjeta_CVV: '123',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      const result = await service.create(createTarjetaDto);

      expect(result).toEqual({
        status: 400,
        message: Error_Tarjeta.ERROR_CREAR_TARJETA,
      });
    });
  });

  describe('findAll', () => {
    it('should return all tarjetas', async () => {
      const tarjetas = [new Tarjeta(), new Tarjeta()];
      jest.spyOn(tarjetaRepository, 'find').mockResolvedValue(tarjetas);

      const result = await service.findAll();

      expect(result).toEqual(tarjetas);
      expect(tarjetaRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a tarjeta by id', async () => {
      const tarjeta = new Tarjeta();
      tarjeta.id_Tarjeta = 1;
      jest.spyOn(tarjetaRepository, 'findOneById').mockResolvedValue(tarjeta);

      const result = await service.findOne(1);

      expect(result).toEqual({
        status: 201,
        buscar: tarjeta,
      });
      expect(tarjetaRepository.findOneById).toHaveBeenCalledWith(1);
    });

    it('should return an error if tarjeta not found', async () => {
      jest.spyOn(tarjetaRepository, 'findOneById').mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toEqual({
        status: 400,
        message: Error_Tarjeta.ERROR_TARJETA_NO_ENCONTRADA,
      });
      expect(tarjetaRepository.findOneById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a tarjeta successfully', async () => {
      const updateTarjetaDto: UpdateTarjetaDto = {
        tarjeta_Numero_Tarjeta: '1234567890123456',
        tarjeta_Fecha_Vencimiento: '12/26',
        tarjeta_CVV: '456',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      const result = await service.update(1, updateTarjetaDto);

      expect(result).toEqual({
        status: 201,
        message: Exito_Tarjetas.ACTUALIZAR_TARJETA,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar,
        Tarjeta,
        updateTarjetaDto,
      );
    });

    it('should return an error if update fails', async () => {
      const updateTarjetaDto: UpdateTarjetaDto = {
        tarjeta_Numero_Tarjeta: '1234567890123456',
        tarjeta_Fecha_Vencimiento: '12/26',
        tarjeta_CVV: '456',
      };
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      const result = await service.update(1, updateTarjetaDto);

      expect(result).toEqual({
        status: 400,
        message: Error_Tarjeta.ERROR_TARJETA_NO_ACTUALIZADA,
      });
    });
  });

  describe('remove', () => {
    it('should remove a tarjeta successfully', async () => {
      const tarjeta = new Tarjeta();
      tarjeta.id_Tarjeta = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue({
        status: 201,
        buscar: tarjeta,
      });
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Éxito');

      const result = await service.remove(1);

      expect(result).toEqual({
        status: 201,
        message: Exito_Tarjetas.ELIMINAR_TARJETA,
      });
      expect(transaccionService.transaction).toHaveBeenCalledWith(
        Tipo_Transaccion.Actualizar_Con_Parametros,
        Tarjeta,
        Tarjeta_Estado.ELIMINADO,
        'tarjeta_Status',
        '1',
      );
    });

    it('should return an error if tarjeta not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({
        status: 400,
        message: Error_Tarjeta.ERROR_TARJETA_NO_ENCONTRADA,
      });

      const result = await service.remove(1);

      expect(result).toEqual({
        status: 400,
        message: Error_Tarjeta.ERROR_TARJETA_NO_ENCONTRADA,
      });
    });

    it('should return an error if remove fails', async () => {
      const tarjeta = new Tarjeta();
      tarjeta.id_Tarjeta = 1;
      jest.spyOn(service, 'findOne').mockResolvedValue({
        status: 201,
        buscar: tarjeta,
      });
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue('Error');

      const result = await service.remove(1);

      expect(result).toEqual({
        status: 400,
        message: Error_Tarjeta.ERROR_TAJETA_NO_ELIMINADA,
      });
    });

    describe('other', () => {
      it('should return an error when registering an expired card', async () => {
        const expiredTarjeta: CreateTarjetaDto = {
          tarjeta_Titular: 'Juan Perez',
          tarjeta_Direccion: 'Calle 123',
          tarjeta_Numero_Tarjeta: '4111111111111111',
          tarjeta_Fecha_Vencimiento: '01/20',
          tarjeta_CVV: '123',
        };
        jest
          .spyOn(transaccionService, 'transaction')
          .mockResolvedValue('Error');

        const result = await service.create(expiredTarjeta);

        expect(result).toEqual({
          status: 400,
          message: Error_Tarjeta.ERROR_CREAR_TARJETA,
        });
        expect(transaccionService.transaction).toHaveBeenCalledWith(
          Tipo_Transaccion.Guardar,
          Tarjeta,
          expiredTarjeta,
        );
      });
    });
  });
});
