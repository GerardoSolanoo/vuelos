import { UnauthorizedException } from '@nestjs/common';
import { Roles as Rol } from '../../common/enums/roles.enum';
import { Errores_Roles } from '../../common/helpers/roles.helpers';
import { User_Interface } from '../../common/interfaces/user.interface';

/**
 * Validates if the user has the standard user role.
 * @param user The user object to be validated.
 * @throws UnauthorizedException If the user does not have the user role.
 * @returns True if the user has the user role.
 */
export function validateUser(user: User_Interface) {
  if (user.role !== Rol.USUARIO) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  } else {
    return true;
  }
}

/**
 * Validates if the user has the administrator role.
 * @param user The user object to be validated.
 * @throws UnauthorizedException If the user does not have the administrator role.
 * @returns True if the user has the administrator role.
 */
export function validateAdmin(user: User_Interface) {
  if (user.role !== Rol.ADMIN) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  } else {
    return true;
  }
}

/**
 * Validates if the user has any of the allowed roles (user or administrator).
 * @param user The user object to be validated.
 * @throws UnauthorizedException If the user does not have any of the allowed roles.
 * @returns True if the user has any of the allowed roles.
 */
export function validateAll(user: User_Interface) {
  if (user.role === Rol.ADMIN) {
    return true;
  }

  if (user.role === Rol.USUARIO) {
    return true;
  }

  if (user.role !== Rol.ADMIN && user.role !== Rol.USUARIO) {
    throw new UnauthorizedException(Errores_Roles.ROLE_UNAUTHORIZED);
  }
}
