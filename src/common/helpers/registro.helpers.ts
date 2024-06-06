export enum Exito_Registro {
  MENSAJE = 'Registro exitoso',
}

export enum Error_Registro {
  MENSAJE = 'Error al registrar',
  FORMATO_TELEFONO = 'El formato del teléfono es incorrecto',
  FORMATO_EMAIL = 'El formato del email es incorrecto',
  FORMATO_PASSWORD = 'La contraseña debe tener al menos 8 caracteres',
  FORMATO_NOMBRE = 'El nombre no puede estar vacío',
  FORMATO_APELLIDO = 'El apellido no puede estar vacío',
  FORMATO_DIRECCION = 'La dirección no puede estar vacía',
  EDAD_MINIMA = 'La edad mínima es 18 años',
  EDAD_MAXIMA = 'La edad máxima es 120 años',
  FECHA_VENCIMIENTO = 'El formato de la fecha de vencimiento es erroneo',
}
