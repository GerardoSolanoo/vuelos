interface Trabajador {
  trabajador_Nombre: string;
  trabajador_Apellidos: string;
  trabajador_Telefono: string;
  trabajador_CorreoElectronico: string;
  trabajador_FechaNacimiento: Date;
  trabajador_Nacionalidad: string;
  trabajador_HorasVuelo: number;
}

interface SeedTrabajadores {
  trabajadores: Trabajador[];
}

export function registrarTrabajadores() {
  const nombresTrabajador = [
    'Juan',
    'María',
    'Pedro',
    'Ana',
    'Luis',
    'Laura',
    'Carlos',
    'Sofía',
    'Diego',
    'Elena',
    'Miguel',
    'Lucía',
  ];

  const apellidosTrabajador = [
    'García',
    'Rodríguez',
    'Martínez',
    'López',
    'Sánchez',
    'Pérez',
    'González',
    'Gómez',
    'Fernández',
    'Díaz',
    'Moreno',
    'Álvarez',
  ];

  const telefonos = [
    '1234567890',
    '0987654321',
    '5555555555',
    '6666666666',
    '7777777777',
    '8888888888',
    '9999999999',
    '1010101010',
    '1212121212',
    '1313131313',
  ];

  const correosElectronicos = [
    'juan@example.com',
    'maria@example.com',
    'pedro@example.com',
    'ana@example.com',
    'luis@example.com',
    'laura@example.com',
    'carlos@example.com',
    'sofia@example.com',
    'diego@example.com',
    'elena@example.com',
  ];

  const fechaInicio = new Date('1970-01-01').getTime();
  const fechaFin = new Date('2005-12-31').getTime();

  const nacionalidadesTrabajador = [
    'Español',
    'Mexicano',
    'Argentino',
    'Colombiano',
    'Chileno',
    'Peruano',
    'Ecuatoriano',
    'Venezolano',
    'Cubano',
    'Uruguayo',
  ];

  const horasVuelo = [1000, 1500, 800, 1200, 700, 1100, 900, 1300, 600, 1000];

  const trabajadoresGenerados = [];

  for (let i = 0; i < 100; i++) {
    const nombre =
      nombresTrabajador[Math.floor(Math.random() * nombresTrabajador.length)];
    const apellido =
      apellidosTrabajador[
        Math.floor(Math.random() * apellidosTrabajador.length)
      ];
    const telefono = telefonos[Math.floor(Math.random() * telefonos.length)];
    const correoElectronico =
      correosElectronicos[
        Math.floor(Math.random() * correosElectronicos.length)
      ];
    const fechaNacimiento = new Date(
      fechaInicio + Math.random() * (fechaFin - fechaInicio),
    );
    const nacionalidad =
      nacionalidadesTrabajador[
        Math.floor(Math.random() * nacionalidadesTrabajador.length)
      ];
    const horas = horasVuelo[Math.floor(Math.random() * horasVuelo.length)];

    const trabajador: Trabajador = {
      trabajador_Nombre: nombre,
      trabajador_Apellidos: apellido,
      trabajador_Telefono: telefono,
      trabajador_CorreoElectronico: correoElectronico,
      trabajador_FechaNacimiento: fechaNacimiento,
      trabajador_Nacionalidad: nacionalidad,
      trabajador_HorasVuelo: horas,
    };
    trabajadoresGenerados.push(trabajador);
  }

  return trabajadoresGenerados;
}

export const initialTrabajadores: SeedTrabajadores = {
  trabajadores: registrarTrabajadores(),
};
