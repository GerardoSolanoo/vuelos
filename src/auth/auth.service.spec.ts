import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CuentasService } from '../resource/cuentas/cuentas.service';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { TransaccionService } from '../common/transaction/transaccion.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let cuentasService: CuentasService;
  let clientService: ClientService;
  let jwtService: JwtService;
  let transaccionService: TransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CuentasService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            validar_cuenta: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: TransaccionService,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    cuentasService = module.get<CuentasService>(CuentasService);
    clientService = module.get<ClientService>(ClientService);
    jwtService = module.get<JwtService>(JwtService);
    transaccionService = module.get<TransaccionService>(TransaccionService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockRegisterDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
        usuario_Nombre: 'John',
        usuario_Apellidos: 'Doe',
        usuario_Edad: 30,
        usuario_Tarjeta_Titular: 'John Doe',
        usuario_Tarjeta_Direccion: '123 Street',
        usuario_Tarjeta_Numero_Tarjeta: '1234567890123456',
        usuario_Tarjeta_Fecha_Vencimiento: '12/25',
        usuario_Tarjeta_Cvv: '123',
      };

      jest.spyOn(cuentasService, 'findOneByEmail').mockResolvedValue(false);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue({
        mensaje: 'Éxito',
        resultado: [{ id_Usuario: 1 }, { id_Tarjeta: 1 }],
      });
      jest.spyOn(clientService, 'validar_cuenta').mockResolvedValue({
        status: 201,
        codigo: '123456',
      });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedActivacion');

      const result = await authService.register(mockRegisterDto);

      expect(result).toEqual({
        usuario_Nombre: 'John',
        identificador: 'test@example.com',
        message: 'Usuario creado',
      });
    });

    it('should fail if transaction service returns an error', async () => {
      const mockRegisterDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
        usuario_Nombre: 'John',
        usuario_Apellidos: 'Doe',
        usuario_Edad: 30,
        usuario_Tarjeta_Titular: 'John Doe',
        usuario_Tarjeta_Direccion: '123 Street',
        usuario_Tarjeta_Numero_Tarjeta: '1234567890123456',
        usuario_Tarjeta_Fecha_Vencimiento: '12/25',
        usuario_Tarjeta_Cvv: '123',
      };

      jest.spyOn(cuentasService, 'findOneByEmail').mockResolvedValue(false);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(transaccionService, 'transaction').mockResolvedValue({
        mensaje: 'Error',
        resultado: [],
      });

      const result = await authService.register(mockRegisterDto);

      expect(result).toEqual({
        status: 400,
        message: 'Usuario no creado',
      });
    });

    it('should throw BadRequestException if user already exists', async () => {
      const mockRegisterDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
        usuario_Nombre: 'John',
        usuario_Apellidos: 'Doe',
        usuario_Edad: 30,
        usuario_Tarjeta_Titular: 'John Doe',
        usuario_Tarjeta_Direccion: '123 Street',
        usuario_Tarjeta_Numero_Tarjeta: '1234567890123456',
        usuario_Tarjeta_Fecha_Vencimiento: '12/25',
        usuario_Tarjeta_Cvv: '123',
      };

      jest.spyOn(cuentasService, 'findOneByEmail').mockResolvedValue({
        cuenta: {
          cuenta_ID: 1,
          cuenta_Identificador: 'test@example.com',
          cuenta_Contraseña: 'hashedPassword',
          cuenta_Estado_Cuenta: 'ACTIVE',
          cuenta_Rol: 'user',
        },
        usuario: {
          usuario_ID: 1,
          usuario_Nombre: 'John',
          usuario_Apellidos: 'Doe',
        },
      });

      await expect(authService.register(mockRegisterDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  //activación del usuario entre

  describe('login', () => {
    it('should login successfully', async () => {
      const mockLoginDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
      };

      const mockCuenta = {
        cuenta: {
          cuenta_ID: 1,
          cuenta_Identificador: 'test@example.com',
          cuenta_Contraseña: 'hashedPassword',
          cuenta_Rol: 'user',
          cuenta_Estado_Cuenta: 'ACTIVE',
        },
        usuario: {
          usuario_ID: 1,
          usuario_Nombre: 'John',
          usuario_Apellidos: 'Doe',
        },
      };

      jest
        .spyOn(cuentasService, 'findOneByEmail')
        .mockResolvedValue(mockCuenta);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('accessToken');

      const result = await authService.login(mockLoginDto);

      expect(result).toEqual({
        access_Token: 'accessToken',
        identificador: 'test@example.com',
        role: 'user',
        message: 'Sesión activa',
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const mockLoginDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
      };

      jest.spyOn(cuentasService, 'findOneByEmail').mockResolvedValue(null);

      await expect(authService.login(mockLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should fail if password does not match', async () => {
      const mockLoginDto = {
        identificador: 'test@example.com',
        contraseña: 'wrongpassword',
      };

      const mockCuenta = {
        cuenta: {
          cuenta_ID: 1,
          cuenta_Identificador: 'test@example.com',
          cuenta_Contraseña: 'hashedPassword',
          cuenta_Rol: 'user',
          cuenta_Estado_Cuenta: 'ACTIVE',
        },
        usuario: {
          usuario_ID: 1,
          usuario_Nombre: 'John',
          usuario_Apellidos: 'Doe',
        },
      };

      jest
        .spyOn(cuentasService, 'findOneByEmail')
        .mockResolvedValue(mockCuenta);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(authService.login(mockLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should fail if account is inactive', async () => {
      const mockLoginDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
      };

      const mockCuenta = {
        cuenta: {
          cuenta_ID: 1,
          cuenta_Identificador: 'test@example.com',
          cuenta_Contraseña: 'hashedPassword',
          cuenta_Rol: 'user',
          cuenta_Estado_Cuenta: 'INACTIVO',
        },
        usuario: {
          usuario_ID: 1,
          usuario_Nombre: 'John',
          usuario_Apellidos: 'Doe',
        },
      };

      jest
        .spyOn(cuentasService, 'findOneByEmail')
        .mockResolvedValue(mockCuenta);

      await expect(authService.login(mockLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should fail if account is blocked', async () => {
      const mockLoginDto = {
        identificador: 'test@example.com',
        contraseña: 'password123',
      };

      const mockCuenta = {
        cuenta: {
          cuenta_ID: 1,
          cuenta_Identificador: 'test@example.com',
          cuenta_Contraseña: 'hashedPassword',
          cuenta_Rol: 'user',
          cuenta_Estado_Cuenta: 'BLOQUEADO',
        },
        usuario: {
          usuario_ID: 1,
          usuario_Nombre: 'John',
          usuario_Apellidos: 'Doe',
        },
      };

      jest
        .spyOn(cuentasService, 'findOneByEmail')
        .mockResolvedValue(mockCuenta);

      await expect(authService.login(mockLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
