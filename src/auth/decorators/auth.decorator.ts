import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles as Rol } from '../../common/enums/roles.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RoleGuard } from '../guard/role.guard'; 
import { Roles } from './roles.decorator';

// Esta función crea un decorador de autorización que toma un rol como argumento
export function Auth(roles: Rol) {
  // Aplica los decoradores 'Roles' y 'UseGuards' al decorador que se está creando
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RoleGuard));
}