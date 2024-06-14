import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrabajadoresService } from './trabajadores.service';
import { Trabajador } from './entities/trabajador.entity';
import { Tripulacion } from '../tripulaciones/entities/tripulacion.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';
import { NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

describe('TrabajadoresService', () => {
  let service: TrabajadoresService;
  let trabajadoresRepository: Repository<Trabajador>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrabajadoresService,
        {
          provide: getRepositoryToken(Trabajador),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Tripulacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TrabajadoresService>(TrabajadoresService);
    trabajadoresRepository = module.get<Repository<Trabajador>>(
      getRepositoryToken(Trabajador),
    );
  });

  describe('create', () => {
    it('debería crear un nuevo trabajador', async () => {
      const createTrabajadorDto: CreateTrabajadorDto = {
        trabajador_Nombre: 'Juan',
        trabajador_Apellidos: 'Pérez',
        trabajador_Telefono: '1234567890',
        trabajador_CorreoElectronico: 'juan.perez@example.com',
        trabajador_FechaNacimiento: new Date('1990-01-01'),
        trabajador_Nacionalidad: 'Mexicana',
        trabajador_HorasVuelo: 500,
      };

      const trabajador = new Trabajador();
      jest.spyOn(trabajadoresRepository, 'create').mockReturnValue(trabajador);
      jest.spyOn(trabajadoresRepository, 'save').mockResolvedValue(trabajador);

      expect(await service.create(createTrabajadorDto)).toBe(trabajador);
      expect(trabajadoresRepository.create).toHaveBeenCalledWith(
        createTrabajadorDto,
      );
      expect(trabajadoresRepository.save).toHaveBeenCalledWith(trabajador);
    });

    it('debería manejar un error de creación', async () => {
      const createTrabajadorDto: CreateTrabajadorDto = {
        trabajador_Nombre: 'Juan',
        trabajador_Apellidos: 'Pérez',
        trabajador_Telefono: '1234567890',
        trabajador_CorreoElectronico: 'juan.perez@example.com',
        trabajador_FechaNacimiento: new Date('1990-01-01'),
        trabajador_Nacionalidad: 'Mexicana',
        trabajador_HorasVuelo: 500,
      };

      jest
        .spyOn(trabajadoresRepository, 'save')
        .mockRejectedValue(new Error('Error de creación'));

      await expect(service.create(createTrabajadorDto)).rejects.toThrow(
        'Unexpected error occurred',
      );
    });
  });

  describe('findAll', () => {
    it('debería devolver todos los trabajadores', async () => {
      const trabajadores = [new Trabajador(), new Trabajador()];
      jest
        .spyOn(trabajadoresRepository, 'find')
        .mockResolvedValue(trabajadores);

      expect(await service.findAll()).toBe(trabajadores);
      expect(trabajadoresRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver un trabajador por su ID', async () => {
      const trabajador = new Trabajador();
      jest
        .spyOn(trabajadoresRepository, 'findOne')
        .mockResolvedValue(trabajador);

      expect(await service.findOne(1)).toBe(trabajador);
      expect(trabajadoresRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('debería devolver un error si no se encuentra el trabajador por ID', async () => {
      jest
        .spyOn(trabajadoresRepository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Trabajador with ID 1 not found'),
      );
    });

    it('debería devolver un trabajador usando opciones de búsqueda', async () => {
      const trabajador = new Trabajador();
      const options: FindOneOptions<Trabajador> = {
        where: { trabajador_Nombre: 'Juan' },
      };
      jest
        .spyOn(trabajadoresRepository, 'findOne')
        .mockResolvedValue(trabajador);

      expect(await service.findOne(options)).toBe(trabajador);
      expect(trabajadoresRepository.findOne).toHaveBeenCalledWith(options);
    });

    it('debería devolver un error si no se encuentra el trabajador usando opciones de búsqueda', async () => {
      const options: FindOneOptions<Trabajador> = {
        where: { trabajador_Nombre: 'Juan' },
      };
      jest
        .spyOn(trabajadoresRepository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(service.findOne(options)).rejects.toThrow(
        new NotFoundException('Trabajador not found'),
      );
    });
  });

  describe('update', () => {
    it('debería actualizar un trabajador', async () => {
      const updateTrabajadorDto: UpdateTrabajadorDto = {
        trabajador_Nombre: 'Juan',
      };
      const trabajador = new Trabajador();
      jest.spyOn(service, 'findOne').mockResolvedValue(trabajador);
      jest.spyOn(trabajadoresRepository, 'merge').mockReturnValue(trabajador);
      jest.spyOn(trabajadoresRepository, 'save').mockResolvedValue(trabajador);

      expect(await service.update(1, updateTrabajadorDto)).toBe(trabajador);
      expect(trabajadoresRepository.merge).toHaveBeenCalledWith(
        trabajador,
        updateTrabajadorDto,
      );
      expect(trabajadoresRepository.save).toHaveBeenCalledWith(trabajador);
    });

    it('debería devolver un error si no se puede actualizar el trabajador', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(
        service.update(1, {} as UpdateTrabajadorDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un trabajador', async () => {
      const trabajador = new Trabajador();
      jest.spyOn(service, 'findOne').mockResolvedValue(trabajador);
      jest
        .spyOn(trabajadoresRepository, 'remove')
        .mockResolvedValue(trabajador);

      expect(await service.remove(1)).toBe(trabajador);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(trabajadoresRepository.remove).toHaveBeenCalledWith(trabajador);
    });

    it('debería devolver un error si no se puede eliminar el trabajador', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
