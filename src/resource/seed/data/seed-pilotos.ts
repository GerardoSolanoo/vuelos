import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

interface Piloto {
  piloto_Nombre: string;
  piloto_Apellidos: string;
  piloto_Telefono: string;
  piloto_Correo_Electronico: string;
  piloto_Licencia_Piloto: string;
  piloto_Fecha_Nacimiento: Date;
  piloto_Nacionalidad: string;
  piloto_Horas_Vuelo: number;
  piloto_Certificaciones: string[];
  piloto_Fecha_Expedicion_Licencia: Date;
  piloto_Estado_Logico: string;
}

type EstadoLogicoPiloto = Estado_Logico;

interface SeedPilotos {
  pilotos: Piloto[];
}

export function registrar_Pilotos() {
  const nombres = [
    'Juan',
    'Pedro',
    'Luis',
    'Carlos',
    'Javier',
    'Miguel',
    'Angel',
    'Jose',
    'Manuel',
    'Antonio',
  ];
  const apellidos = [
    'Perez',
    'Gonzalez',
    'Rodriguez',
    'Fernandez',
    'Lopez',
    'Martinez',
    'Sanchez',
    'Gomez',
    'Diaz',
    'Hernandez',
  ];
  const nacionalidades = [
    'Mexicana',
    'Estadounidense',
    'Canadiense',
    'Española',
    'Francesa',
    'Alemana',
    'Italiana',
    'Brasileña',
    'Argentina',
    'Chilena',
  ];
  const certificaciones: string[] = [
    'Private Pilot License (PPL)',
    'Commercial Pilot License (CPL)',
    'Airline Transport Pilot License (ATPL)',
    'Flight Instructor Certificate (CFI)',
    'Instrument Rating (IR)',
    'Multi-Engine Rating (MER)',
    'Type Rating for Large Jets',
    'Helicopter Pilot Qualification',
    'Seaplane Qualification Rating',
    'Unmanned Aerial Systems (UAS) Certification',
  ];
  const estado_Logico = [Estado_Logico.ACTIVO, Estado_Logico.INACTIVO];

  return generar_Pilotos(
    nombres,
    apellidos,
    nacionalidades,
    certificaciones,
    estado_Logico,
  );
}

function generar_Pilotos(
  nombres: string[],
  apellidos: string[],
  nacionalidades: string[],
  certificaciones: string[],
  estadologico: string[],
) {
  const pilotos_generados = [];

  for (let i = 0; i < 10; i++) {
    const piloto = generar_Piloto(
      nombres[Math.floor(Math.random() * nombres.length)],
      apellidos[Math.floor(Math.random() * apellidos.length)],
      nacionalidades[Math.floor(Math.random() * nacionalidades.length)],
      certificaciones,
      estadologico[Math.floor(Math.random() * estadologico.length)],
    );
    pilotos_generados.push(piloto);
  }

  return pilotos_generados;
}

function generar_Piloto(
  nombre: string,
  apellido: string,
  nacionalidad: string,
  certificaciones: string[],
  estadologico: string,
) {
  const piloto: Piloto = {
    piloto_Nombre: nombre,
    piloto_Apellidos: apellido,
    piloto_Telefono: generar_Numeros_Telefono(),
    piloto_Correo_Electronico: generar_Correos_Electronicos(nombre, apellido),
    piloto_Licencia_Piloto: 'Licencia ' + Math.floor(Math.random() * 1000),
    piloto_Fecha_Nacimiento: new Date(
      generar_año_Fecha_Nacimiento(),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
    ),
    piloto_Nacionalidad: nacionalidad,
    piloto_Horas_Vuelo: Math.floor(Math.random() * 2000),
    piloto_Certificaciones: certificaciones
      .sort(() => Math.random() - Math.random())
      .slice(0, 4),
    piloto_Fecha_Expedicion_Licencia: new Date(
      generar_año_Fecha_Expedicion_Licencia(),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
    ),
    piloto_Estado_Logico: estadologico,
  };
  return piloto;
}

function generar_año_Fecha_Nacimiento() {
  return Math.floor(Math.random() * (2000 - 1980) + 1980);
}

function generar_año_Fecha_Expedicion_Licencia() {
  return Math.floor(Math.random() * (2010 - 2000) + 2000);
}

function generar_Correos_Electronicos(
  piloto_Nombre: string,
  piloto_Apellidos: string,
) {
  const correos_Array = [
    '@gmail.com',
    '@yahoo.com',
    '@outlook.com',
    '@hotmail.com',
    '@protonmail.com',
    '@aol.com',
    '@mail.com',
    '@icloud.com',
    '@zoho.com',
    '@yandex.com',
  ];

  const nombre_Piloto = piloto_Nombre + piloto_Apellidos;

  return (
    nombre_Piloto.toLowerCase().replace(/ /g, '') +
    correos_Array[Math.floor(Math.random() * correos_Array.length)]
  );
}

function generar_Numeros_Telefono() {
  const numeros = [];
  for (let i = 0; i < 10; i++) {
    numeros.push(Math.floor(Math.random() * 10));
  }
  return numeros.join('');
}
