import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Roles } from '../../common/enums/roles.enum';
import { Roles_Key } from '../decorators/roles.decorator';
import { Errores_Roles } from '../../common/helpers/roles.helpers';

/**
 * Guardia de autenticación que valida los roles de usuario.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // Inyecta el servicio Reflector para acceder a los metadatos de los controladores y los métodos

  /**
   * Método canActivate para validar los roles de usuario.
   * @param context Contexto de ejecución.
   * @returns Booleano que indica si la solicitud está permitida o no.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener los roles requeridos del decorador Roles_Key definido en el controlador o método
    const roles = await this.reflector.getAllAndOverride<Roles>(Roles_Key, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Obtener la solicitud HTTP del contexto de ejecución
    const user = await context.switchToHttp().getRequest().user;

    if (!user) {
      // Si no hay usuario en la solicitud, lanzar una UnauthorizedException
      throw new UnauthorizedException(Errores_Roles.ROLE_NOT_FOUND);
    }

    let validar = false;

    // Iterar sobre los valores del enum Roles
    const valoresEnum = Object.values(Roles);
    for (const valor of valoresEnum) {
      if (user.role === valor) {
        return (validar = true);
      } else {
        validar = false;
      }
    }

    if (validar === false) {
      throw new UnauthorizedException(Errores_Roles.ROLE_INVALID);
    }

    return roles === user.role; // Devuelve true si los roles requeridos coinciden con el rol del usuario
  }
}
