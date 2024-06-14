import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionesService } from './ubicaciones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
import { NotFoundException } from '@nestjs/common';

describe('UbicacionesService', () => {
  let service: UbicacionesService;
  let repository: Repository<Ubicacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UbicacionesService,
        {
          provide: getRepositoryToken(Ubicacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UbicacionesService>(UbicacionesService);
    repository = module.get<Repository<Ubicacion>>(
      getRepositoryToken(Ubicacion),
    );
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una nueva ubicación', async () => {
    const createUbicacionDto = {
      ubicacion_Nombre: 'Example Name',
      latitud: 123.456,
      longitud: 789.012,
    };
    const mockUbicacion = { ubicacion_Id: 1 } as Ubicacion;
    jest.spyOn(repository, 'create').mockReturnValue(mockUbicacion);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUbicacion);

    const result = await service.create(createUbicacionDto);
    expect(result).toEqual(mockUbicacion);
  });

  it('debería retornar todas las ubicaciones', async () => {
    const mockUbicaciones = [
      { ubicacion_Id: 1 },
      { ubicacion_Id: 2 },
    ] as Ubicacion[];
    jest.spyOn(repository, 'find').mockResolvedValue(mockUbicaciones);

    const result = await service.findAll();
    expect(result).toEqual(mockUbicaciones);
  });

  it('debería retornar una ubicación por id', async () => {
    const id = 1;
    const mockUbicacion = { ubicacion_Id: 1 } as Ubicacion;
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUbicacion);

    const result = await service.findOne(id);
    expect(result).toEqual(mockUbicacion);
  });

  it('debería lanzar NotFoundException si la ubicación no existe', async () => {
    const id = 1;
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar una ubicación existente', async () => {
    const id = 1;
    const updateUbicacionDto = {};
    const mockUbicacion = { ubicacion_Id: 1 } as Ubicacion;
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUbicacion);
    jest.spyOn(repository, 'merge').mockReturnValue(mockUbicacion);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUbicacion);

    const result = await service.update(id, updateUbicacionDto);
    expect(result).toEqual(mockUbicacion);
  });

  it('debería eliminar una ubicación por id', async () => {
    const id = 1;
    const mockUbicacion = { ubicacion_Id: 1 } as Ubicacion;
    jest.spyOn(service, 'findOne').mockResolvedValue(mockUbicacion);
    jest.spyOn(repository, 'remove').mockResolvedValue(mockUbicacion);

    const result = await service.remove(id);
    expect(result).toEqual(mockUbicacion);
  });
});
