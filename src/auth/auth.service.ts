import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { CuentasService } from '../resource/cuentas/cuentas.service';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Estado } from '../common/enums/cuentas.enum';
import { Errores_Cuentas } from '../common/helpers/cuentas.helpers';
import {
  Exito_USUARIO,
  Errores_USUARIO,
} from '../common/helpers/usuario.helpers';
import { RegisterDto } from './dto/registro.dto';
import { Usuario } from '../resource/usuario/entities/usuario.entity';
import { Cuenta } from '../resource/cuentas/entities/cuenta.entity';
import { CreateTarjetaDto } from '../resource/tarjeta/dto/create-tarjeta.dto';

import { TransaccionService } from '../common/transaction/transaccion.service';
import { Tipo_Transaccion } from '../common/enums/tipo_Transaccion.enum';
import { CreateUsuarioDto } from '../resource/usuario/dto/create-usuario.dto';
import { Tarjeta } from '../resource/tarjeta/entities/tarjeta.entity';
import { Error_Tarjeta } from '../common/helpers/tarjetas.helpers';
import { CreateCuentaDto } from '../resource/cuentas/dto/create-cuenta.dto';

@Injectable()
export class AuthService {
  constructor(
    private cuentasService: CuentasService,
    private clientService: ClientService,
    private jwtService: JwtService,
    private transaccionService: TransaccionService,
  ) {}

  /**
   * Registra un nuevo usuario.
   * @param registroDTO Datos del usuario a registrar.
   * @returns Información del usuario registrado.
   */
  async register(registroDTO: RegisterDto) {
    const {
      identificador,
      contraseña,
      usuario_Nombre,
      usuario_Apellidos,
      usuario_Edad,
      usuario_Tarjeta_Titular,
      usuario_Tarjeta_Direccion,
      usuario_Tarjeta_Numero_Tarjeta,
      usuario_Tarjeta_Fecha_Vencimiento,
      usuario_Tarjeta_Cvv,
    } = registroDTO;

    // Verificar si ya existe un usuario con el mismo identificador
    const user = await this.cuentasService.findOneByEmail(identificador);

    if (user != false) {
      throw new BadRequestException(Errores_USUARIO.USUARIO_DUPLICATED);
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const usuario_Data: CreateUsuarioDto = {
      usuario_Nombre: usuario_Nombre,
      usuario_Apellidos: usuario_Apellidos,
      usuario_Edad: usuario_Edad,
    };

    let nuevo_Usuario: any;

    let nueva_Tarjeta: any;

    let crear_Cuenta: any;

    try {
      // Guardar el nuevo usuario en la base de datos
      nuevo_Usuario = await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Usuario,
        usuario_Data,
      );
      if (nuevo_Usuario.mensaje == 'Error') {
        return {
          status: 400, // Código de estado de error
          message: Errores_USUARIO.USUARIO_NOT_CREATED, // Mensaje de error personalizado
        };
      }

      const tarjeta_Data: CreateTarjetaDto = {
        tarjeta_Titular: usuario_Tarjeta_Titular,
        tarjeta_Direccion: usuario_Tarjeta_Direccion,
        tarjeta_Numero_Tarjeta: usuario_Tarjeta_Numero_Tarjeta,
        tarjeta_Fecha_Vencimiento: usuario_Tarjeta_Fecha_Vencimiento,
        tarjeta_CVV: usuario_Tarjeta_Cvv,
      };

      // Guardar la tarjeta en la base de datos
      nueva_Tarjeta = await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Tarjeta,
        tarjeta_Data,
      );

      if (nueva_Tarjeta.mensaje == 'Error') {
        return {
          status: 400, // Código de estado de error
          message: Error_Tarjeta.ERROR_CREAR_TARJETA, // Mensaje de error personalizado
        };
      }

      // Enviar correo de confirmación para activar la cuenta registrada
      const enviar_email = await this.clientService.validar_cuenta(
        identificador,
      );

      if (enviar_email.status != 201) {
        return {
          status: 400, // Código de estado de error
          message: Errores_Cuentas.CUENTA_NOT_CREATED, // Mensaje de error personalizado
        };
      }

      // Hashear el numero de activacion antes de almacenarla en la base de datos
      const hashedActivacion = await bcrypt.hash(enviar_email.codigo, 10);

      //Obtener la fecha de registro
      const fecha_registro: Date = new Date();

      // Obtener el día, mes y año
      const dia: string = fecha_registro.getDate().toString().padStart(2, '0');
      const mes: string = (fecha_registro.getMonth() + 1)
        .toString()
        .padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
      const año: number = fecha_registro.getFullYear();

      // Formatear la fecha en DD-MM-YYYY
      const fecha_formateada = `${dia}-${mes}-${año}`;

      // Crear una nueva cuenta asociada al usuario
      const cuenta: CreateCuentaDto = {
        cuenta_Identificador: identificador,
        cuenta_Contraseña: hashedPassword,
        id_Usuario: nuevo_Usuario.resultado.id_Usuario,
        cuenta_Numero_Activacion: hashedActivacion,
        cuenta_Fecha_Registro: fecha_formateada,
        id_Tarjeta: nueva_Tarjeta.resultado.id_Tarjeta,
      };

      // Guardar la nueva cuenta en la base de datos
      crear_Cuenta = await this.transaccionService.transaction(
        Tipo_Transaccion.Guardar,
        Cuenta,
        cuenta,
      );
      if (crear_Cuenta.mensaje != 'Éxito') {
        await this.transaccionService.transaction(
          Tipo_Transaccion.Eliminar_Con_Parametros,
          Usuario,
          '',
          'id_Usuario',
          nuevo_Usuario.resultado.id_Usuario,
        );
        await this.transaccionService.transaction(
          Tipo_Transaccion.Eliminar_Con_Parametros,
          Tarjeta,
          '',
          'id_Tarjeta',
          nueva_Tarjeta.resultado.id_Tarjeta,
        );
        return {
          status: 400, // Código de estado de error
          message: Errores_Cuentas.CUENTA_NOT_CREATED, // Mensaje de error personalizado
        };
      }

      return {
        usuario_Nombre,
        identificador,
        message: Exito_USUARIO.USUARIO_CREATED,
      };
    } catch (error) {
      return {
        status: 400, // Código de estado de error
        message: Errores_USUARIO.USUARIO_NOT_CREATED, // Mensaje de error personalizado
      };
    }
  }

  /**
   * Inicia sesión para un usuario existente.
   * @param loginDto Datos del inicio de sesión del usuario.
   * @returns Información de la sesión iniciada.
   */
  async login(loginDto: LoginDto) {
    // Extraer identificador y contraseña del DTO de inicio de sesión
    const { identificador, contraseña } = loginDto;

    // Buscar la cuenta por el identificador (que puede ser un correo electrónico)
    const cuenta: any = await this.cuentasService.findOneByEmail(identificador);

    // Si no se encuentra la cuenta, lanzar una excepción de no autorizado
    if (cuenta == null || cuenta == false) {
      throw new UnauthorizedException(Errores_USUARIO.USUARIO_NOT_FOUND);
    }

    console.log(cuenta.cuenta);
    // Verificar el estado de la cuenta para permitir el acceso
    const estadoCuenta = cuenta.cuenta.cuenta_Estado_Cuenta;

    //Permitir el acceso solo a cuentas activas y no bloqueadas
    if (estadoCuenta == Estado.PENDIENTE || estadoCuenta == Estado.INACTIVO) {
      throw new UnauthorizedException(Errores_Cuentas.CUENTA_INACTIVA);
    }

    if (estadoCuenta == Estado.BLOQUEADO) {
      throw new UnauthorizedException(Errores_Cuentas.CUENTA_BLOQUEADA);
    }

    if (estadoCuenta == Estado.ELIMINADO) {
      throw new UnauthorizedException(Errores_Cuentas.CUENTA_ELIMINADA);
    }
    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
    if (!(await bcrypt.compare(contraseña, cuenta.cuenta.cuenta_Contraseña))) {
      throw new UnauthorizedException(Errores_USUARIO.PASSWORD_NOT_MATCH);
    }

    // Crear el payload para el token JWT con el identificador y el rol de la cuenta
    const payload = {
      identificador: cuenta.cuenta.cuenta_Identificador,
      role: cuenta.cuenta.cuenta_Rol,
    };

    // Firmar el token JWT con el payload
    const access_Token = await this.jwtService.signAsync(payload);

    // Devolver la información de la sesión iniciada
    return {
      access_Token,
      identificador,
      role: cuenta.cuenta.cuenta_Rol,
      message: Exito_USUARIO.Sesion_Activa,
    };
  }
}
