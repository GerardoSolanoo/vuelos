interface Tripulacion {
  tripulacion_NombreEquipo: string;
  tripulacion_CantidadTripulantes: number;
  tripulacion_ClaseViaje: string;
  tripulacion_Valoracion: number;
  id: number[];
}

interface SeedTripulaciones {
  tripulaciones: Tripulacion[];
}

export function registrarTripulaciones() {
  }

export function registrarTripulacion(trabajadores_id: any) {

  const nombresEquipos = [
    'Equipo A',
    'Equipo B',
    'Equipo C',
    'Equipo D',
    'Equipo E',
    'Equipo F',
    'Equipo G',
    'Equipo H',
    'Equipo I',
    'Equipo J',
  ];

  const clasesViaje = [
    'Económica',
    'Primera Clase',
    'Económica',
    'Business',
    'Económica',
    'Primera Clase',
    'Business',
    'Económica',
    'Business',
    'Primera Clase',
  ];

  let tripulaciones = [];

  for (let i = 0; i < 10; i++) {
    let tripulacion = {
      tripulacion_NombreEquipo: nombresEquipos[i],
      tripulacion_CantidadTripulantes: Math.floor(Math.random() * 10) + 1,
      tripulacion_ClaseViaje: clasesViaje[i],
      tripulacion_Valoracion: Math.floor(Math.random() * 5) + 1,
      trabajadores: trabajadores_id.sort(() => Math.random() - Math.random()).slice(0, 4)
    };

    tripulaciones.push(tripulacion);
  }

  return tripulaciones;
}
