import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estado } from '../../common/enums/cuentas.enum';
import { Tipo_Transaccion } from '../../common/enums/tipo_Transaccion.enum';
import {
  Exito_Cuentas,
  Errores_Cuentas,
} from '../../common/helpers/cuentas.helpers';
import { TransaccionService } from '../../common/transaction/transaccion.service';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { Cuenta } from './entities/cuenta.entity';
import { Tarjeta } from '../tarjeta/entities/tarjeta.entity';
import * as bcrypt from 'bcrypt';

describe('CuentasService', () => {
  let service: CuentasService;
  let cuentaRepository: Repository<Cuenta>;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CuentasService,
        {
          provide: getRepositoryToken(Cuenta),
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

    service = module.get<CuentasService>(CuentasService);
    cuentaRepository = module.get<Repository<Cuenta>>(
      getRepositoryToken(Cuenta),
    );
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  describe('create', () => {
    it('should create a new account', async () => {
      const usuario = new Usuario();
      usuario.id_Usuario = 1;
      usuario.usuario_Nombre = 'boby dev';
      usuario.usuario_Apellidos = 'el prots';
      usuario.usuario_Edad = 12;

      const createCuentaDto: CreateCuentaDto = {
        cuenta_Identificador: 'test@example.com',
        cuenta_Contraseña: 'password',
        id_Usuario: usuario,
        cuenta_Numero_Activacion: '',
        cuenta_Fecha_Registro: '',
        id_Tarjeta: new Tarjeta(),
      };
      const cuenta = new Cuenta();
      jest.spyOn(cuentaRepository, 'create').mockReturnValue(cuenta);
      jest.spyOn(cuentaRepository, 'save').mockResolvedValue(cuenta);

      expect(await service.create(createCuentaDto)).toEqual(cuenta);
      expect(cuentaRepository.create).toHaveBeenCalledWith(createCuentaDto);
      expect(cuentaRepository.save).toHaveBeenCalledWith(cuenta);
    });
  });

  describe('findAll', () => {
    it('should return all accounts', async () => {
      const cuentas = [new Cuenta(), new Cuenta()];
      jest.spyOn(cuentaRepository, 'find').mockResolvedValue(cuentas);

      expect(await service.findAll()).toEqual(cuentas);
      expect(cuentaRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOneByEmail', () => {
    it('should return an account by email', async () => {
      const cuenta = new Cuenta();
      cuenta.id_Cuenta = 1;
      cuenta.cuenta_Identificador = 'test@example.com';
      cuenta.cuenta_Contraseña = 'password';
      cuenta.cuenta_Estado_Cuenta = Estado.ACTIVO;
      cuenta.cuenta_Rol = 'user';
      cuenta.id_Usuario = {
        id_Usuario: 1,
        usuario_Nombre: 'Test',
        usuario_Apellidos: 'User',
        usuario_Edad: 18,
      };
      jest.spyOn(cuentaRepository, 'findOne').mockResolvedValue(cuenta);

      expect(await service.findOneByEmail('test@example.com')).toEqual({
        cuenta: {
          cuenta_ID: 1,
          cuenta_Identificador: 'test@example.com',
          cuenta_Contraseña: 'password',
          cuenta_Estado_Cuenta: Estado.ACTIVO,
          cuenta_Rol: 'user',
        },
        usuario: {
          usuario_ID: 1,
          usuario_Nombre: 'Test',
          usuario_Apellidos: 'User',
        },
      });
      expect(cuentaRepository.findOne).toHaveBeenCalledWith({
        where: { cuenta_Identificador: 'test@example.com' },
      });
    });

    it('should return false if account not found', async () => {
      jest.spyOn(cuentaRepository, 'findOne').mockResolvedValue(null);

      expect(await service.findOneByEmail('notfound@example.com')).toBe(false);
      expect(cuentaRepository.findOne).toHaveBeenCalledWith({
        where: { cuenta_Identificador: 'notfound@example.com' },
      });
    });
  });

  describe('other', () => {
    it('should return error if account not found', async () => {
      jest.spyOn(cuentaRepository, 'findOne').mockResolvedValue(null);

      const result = await service.actualizarContraseña(
        'notfound@example.com',
        'newpassword',
        123456,
      );

      expect(result).toEqual({
        status: 400,
        message: Errores_Cuentas.CUENTA_NOT_FOUND,
      });
      expect(cuentaRepository.findOne).toHaveBeenCalledWith({
        where: { cuenta_Identificador: 'notfound@example.com' },
      });
    });
  });
});
