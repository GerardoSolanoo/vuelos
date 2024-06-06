import { TipoAeropuerto } from 'src/common/enums/tipo_aeropuerto.enum';

interface Aeropuerto {
  aeropuerto_Nombre: string;
  aeropuerto_Tipo: Tipo_Aeropuerto;
  aeropuerto_Ubicacion: number;
}

type Tipo_Aeropuerto = TipoAeropuerto;

interface SeedAeropuertos {
  aeropuertos: Aeropuerto[];
}

function generarNombreAleatorio() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let nombre = '';
  for (let i = 0; i < 5; i++) {
    nombre += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return `Aeropuerto ${nombre}`;
}

export function registrarAeropuertos(ubicaciones: any) {
  const array_Ubicaciones = ubicaciones;

  const tipos_Aeropuertos = [
    TipoAeropuerto.INTERNACIONAL,
    TipoAeropuerto.NACIONAL,
    TipoAeropuerto.PRIVADO,
  ];

  const aeropuertos_generados = [];

  for (let i = 0; i < 100; i++) {
    const aeropuerto: Aeropuerto = {
      aeropuerto_Nombre: generarNombreAleatorio(),
      aeropuerto_Tipo:
        tipos_Aeropuertos[Math.floor(Math.random() * tipos_Aeropuertos.length)],
      aeropuerto_Ubicacion:
        array_Ubicaciones[Math.floor(Math.random() * array_Ubicaciones.length)],
    };
    aeropuertos_generados.push(aeropuerto);
  }

  return aeropuertos_generados;
}
