import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertosService } from './aeropuertos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aeropuerto } from './entities/aeropuerto.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { TipoAeropuerto } from '../../common/enums/tipo_aeropuerto.enum';

describe('AeropuertosService', () => {
  let service: AeropuertosService;
  let repository: Repository<Aeropuerto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AeropuertosService,
        {
          provide: getRepositoryToken(Aeropuerto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AeropuertosService>(AeropuertosService);
    repository = module.get<Repository<Aeropuerto>>(
      getRepositoryToken(Aeropuerto),
    );
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo aeropuerto', async () => {
    const createAeropuertoDto: CreateAeropuertoDto = {
      aeropuerto_Nombre: 'Example Name',
      aeropuerto_Tipo: TipoAeropuerto.NACIONAL,
      aeropuerto_Ubicacion: 12345,
    };
    const mockAeropuerto = { id: 1 } as Aeropuerto;
    jest.spyOn(repository, 'create').mockReturnValue(mockAeropuerto);
    jest.spyOn(repository, 'save').mockResolvedValue(mockAeropuerto);

    const result = await service.create(createAeropuertoDto);
    expect(result).toEqual(mockAeropuerto);
  });

  it('debería retornar todos los aeropuertos', async () => {
    const mockAeropuertos = [{ id: 1 }, { id: 2 }] as Aeropuerto[];
    jest.spyOn(repository, 'find').mockResolvedValue(mockAeropuertos);

    const result = await service.findAll();
    expect(result).toEqual(mockAeropuertos);
  });

  it('debería retornar un aeropuerto por id', async () => {
    const id = 1;
    const mockAeropuerto = { id: 1 } as Aeropuerto;
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockAeropuerto);

    const result = await service.findOne(id);
    expect(result).toEqual(mockAeropuerto);
  });

  it('debería lanzar NotFoundException si el aeropuerto no existe', async () => {
    const id = 1;
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
  });

  it('debería actualizar un aeropuerto existente', async () => {
    const id = 1;
    const updateAeropuertoDto = {};
    const mockAeropuerto = { id: 1 } as Aeropuerto;
    jest.spyOn(service, 'findOne').mockResolvedValue(mockAeropuerto);
    jest.spyOn(repository, 'merge').mockReturnValue(mockAeropuerto);
    jest.spyOn(repository, 'save').mockResolvedValue(mockAeropuerto);

    const result = await service.update(id, updateAeropuertoDto);
    expect(result).toEqual(mockAeropuerto);
  });

  it('debería eliminar un aeropuerto por id', async () => {
    const id = 1;
    const mockAeropuerto = { id: 1 } as Aeropuerto;
    jest.spyOn(service, 'findOne').mockResolvedValue(mockAeropuerto);
    jest.spyOn(repository, 'remove').mockResolvedValue(mockAeropuerto);

    const result = await service.remove(id);
    expect(result).toEqual(mockAeropuerto);
  });
});
