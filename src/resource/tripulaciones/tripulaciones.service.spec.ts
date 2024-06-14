import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tripulacion } from './entities/tripulacion.entity';
import { TripulacionesService } from './tripulaciones.service';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTripulacionDto } from './dto/create-tripulacion.dto';
import { UpdateTripulacionDto } from './dto/update-tripulacion.dto';
import { NotFoundException } from '@nestjs/common';

describe('TripulacionesService', () => {
  let service: TripulacionesService;
  let tripulacionesRepository: Repository<Tripulacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripulacionesService,
        {
          provide: getRepositoryToken(Tripulacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TripulacionesService>(TripulacionesService);
    tripulacionesRepository = module.get<Repository<Tripulacion>>(
      getRepositoryToken(Tripulacion),
    );
  });

  describe('create', () => {
    it('debería crear una nueva tripulación', async () => {
      const createTripulacionDto: CreateTripulacionDto = {
        tripulacion_NombreEquipo: 'Equipo A',
        tripulacion_CantidadTripulantes: 5,
        tripulacion_ClaseViaje: 'Primera Clase',
        tripulacion_Valoracion: 5,
        id: [1, 2, 3],
      };
      const tripulacion = new Tripulacion();
      jest
        .spyOn(tripulacionesRepository, 'create')
        .mockReturnValue(tripulacion);
      jest
        .spyOn(tripulacionesRepository, 'save')
        .mockResolvedValue(tripulacion);

      expect(await service.create(createTripulacionDto)).toEqual(tripulacion);
      expect(tripulacionesRepository.create).toHaveBeenCalledWith(
        createTripulacionDto,
      );
      expect(tripulacionesRepository.save).toHaveBeenCalledWith(tripulacion);
    });

    it('debería manejar errores al crear una nueva tripulación', async () => {
      const createTripulacionDto: CreateTripulacionDto = {
        tripulacion_NombreEquipo: 'Equipo A',
        tripulacion_CantidadTripulantes: 5,
        tripulacion_ClaseViaje: 'Primera Clase',
        tripulacion_Valoracion: 5,
        id: [1, 2, 3],
      };
      jest.spyOn(tripulacionesRepository, 'create').mockImplementation(() => {
        throw new Error('Error de creación');
      });

      await expect(service.create(createTripulacionDto)).rejects.toThrow(
        'Unexpected error occurred',
      );
    });
  });
  describe('findAll', () => {
    it('debe devolver todas las tripulaciones', async () => {
      const tripulaciones = [new Tripulacion(), new Tripulacion()];
      jest
        .spyOn(tripulacionesRepository, 'find')
        .mockResolvedValue(tripulaciones);

      expect(await service.findAll()).toEqual(tripulaciones);
      expect(tripulacionesRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debe devolver una tripulación por su ID', async () => {
      const tripulacion = new Tripulacion();
      jest
        .spyOn(tripulacionesRepository, 'findOne')
        .mockResolvedValue(tripulacion);

      expect(await service.findOne(1)).toEqual(tripulacion);
      expect(tripulacionesRepository.findOne).toHaveBeenCalledWith({
        where: { tripulacion_ID: 1 },
      });
    });

    it('debería devolver un error si no se encuentra la tripulación por ID', async () => {
      jest.spyOn(tripulacionesRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Tripulacion with ID 1 not found'),
      );
    });
    it('debe devolver una tripulación por su ID', async () => {
      const tripulacion = new Tripulacion();
      jest
        .spyOn(tripulacionesRepository, 'findOne')
        .mockResolvedValue(tripulacion);

      expect(await service.findOne(1)).toEqual(tripulacion);
      expect(tripulacionesRepository.findOne).toHaveBeenCalledWith({
        where: { tripulacion_ID: 1 },
      });
    });

    it('debería devolver un error si no se encuentra la tripulación por ID', async () => {
      jest.spyOn(tripulacionesRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Tripulacion with ID 1 not found'),
      );
    });

    it('debería devolver una tripulación por opciones de búsqueda', async () => {
      const tripulacion = new Tripulacion();
      const options: FindOneOptions<Tripulacion> = {
        where: { tripulacion_NombreEquipo: 'Equipo A' },
      };
      jest
        .spyOn(tripulacionesRepository, 'findOne')
        .mockResolvedValue(tripulacion);

      expect(await service.findOne(options)).toEqual(tripulacion);
      expect(tripulacionesRepository.findOne).toHaveBeenCalledWith(options);
    });

    it('debería devolver un error si no se encuentra la tripulación por opciones de búsqueda', async () => {
      const options: FindOneOptions<Tripulacion> = {
        where: { tripulacion_NombreEquipo: 'Equipo A' },
      };
      jest.spyOn(tripulacionesRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(options)).rejects.toThrow(
        new NotFoundException('Tripulacion not found'),
      );
    });
  });

  describe('update', () => {
    it('debe actualizar una tripulación', async () => {
      const updateTripulacionDto: UpdateTripulacionDto = {
        tripulacion_NombreEquipo: 'Equipo B',
        tripulacion_CantidadTripulantes: 6,
        tripulacion_ClaseViaje: 'Economica',
        tripulacion_Valoracion: 4,
        id: [1, 2],
      };
      const tripulacion = new Tripulacion();
      jest.spyOn(service, 'findOne').mockResolvedValue(tripulacion);
      jest.spyOn(tripulacionesRepository, 'merge').mockReturnValue(tripulacion);
      jest
        .spyOn(tripulacionesRepository, 'save')
        .mockResolvedValue(tripulacion);

      expect(await service.update(1, updateTripulacionDto)).toEqual(
        tripulacion,
      );
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(tripulacionesRepository.merge).toHaveBeenCalledWith(
        tripulacion,
        updateTripulacionDto,
      );
      expect(tripulacionesRepository.save).toHaveBeenCalledWith(tripulacion);
    });

    it('debería manejar errores al actualizar una tripulación', async () => {
      const updateTripulacionDto: UpdateTripulacionDto = {
        tripulacion_NombreEquipo: 'Equipo B',
        tripulacion_CantidadTripulantes: 6,
        tripulacion_ClaseViaje: 'Economica',
        tripulacion_Valoracion: 4,
        id: [1, 2],
      };
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new Error('Error al buscar');
      });

      await expect(service.update(1, updateTripulacionDto)).rejects.toThrow(
        'Error al buscar',
      );
    });
  });

  describe('remove', () => {
    it('debe eliminar una tripulación', async () => {
      const tripulacion = new Tripulacion();
      jest.spyOn(service, 'findOne').mockResolvedValue(tripulacion);
      jest
        .spyOn(tripulacionesRepository, 'remove')
        .mockResolvedValue(tripulacion);

      expect(await service.remove(1)).toEqual(tripulacion);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(tripulacionesRepository.remove).toHaveBeenCalledWith(tripulacion);
    });

    it('debería manejar errores al eliminar una tripulación', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new Error('Error al buscar');
      });

      await expect(service.remove(1)).rejects.toThrow('Error al buscar');
    });
  });
});
