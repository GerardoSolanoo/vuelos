export enum Errores_USUARIO {
  USUARIO_NOT_FOUND = 'Usuario no encontrado',
  USUARIO_INVALID = 'Usuario inválido',
  USUARIO_DUPLICATED = 'Usuario duplicado',
  USUARIO_NOT_CREATED = 'Usuario no creado',
  USUARIO_NOT_UPDATED = 'Usuario no actualizado',
  USUARIO_NOT_DELETED = 'Usuario no eliminado',
  USUARIO_UNAUTHORIZED = 'Usuario no autorizado',
  PASSWORD_NOT_MATCH = 'Contraseña incorrecta',
  USUARIO_NOMBRE_LONGITUD_MAX = 'El nombre del usuario debe tener maximo de 50 caracteres',
  USUARIO_NOMBRE_LONGITUD_MIN = 'El nombre del usuario debe tener minimo de 3 caracteres',
  USUARIO_APELLIDOS_LONGITUD_MAX = 'El apellido del usuario debe tener maximo de 50 caracteres',
  USUARIO_APELLIDOS_LONGITUD_MIN = 'El apellido del usuario debe tener minimo de 3 caracteres',
}

export enum Exito_USUARIO {
  Sesion_Activa = 'Sesión activa',
  USUARIO_CREATED = 'Usuario creado',
  USUARIO_UPDATED = 'Usuario actualizado',
  USUARIO_DELETED = 'Usuario eliminado',
}
