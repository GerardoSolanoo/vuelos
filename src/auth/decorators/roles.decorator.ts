import { Roles as Rol } from '../../common/enums/roles.enum';
import { SetMetadata } from "@nestjs/common"; 

// Define una constante 'Roles_Key' que sirve como clave para los metadatos de roles
export const Roles_Key = 'roles';

// Define el decorador 'Roles' que toma un rol como argumento y establece metadatos utilizando la función 'SetMetadata'
export const Roles = (rol: Rol) => SetMetadata(Roles_Key, rol);
