interface Ubicacion {
  ubicacion_Nombre: string;
  latitud: number;
  longitud: number;
}

interface SeedUbicaciones {
  ubicaciones: Ubicacion[];
}

export function registrarUbicaciones() {
  const ubicacionesData = [
    { nombre: 'Nueva York, EE. UU.', latitud: 40.7128, longitud: -74.006 },
    { nombre: 'París, Francia', latitud: 48.8566, longitud: 2.3522 },
    { nombre: 'Tokio, Japón', latitud: 35.6895, longitud: 139.6917 },
    { nombre: 'Londres, Reino Unido', latitud: 51.5074, longitud: -0.1278 },
    { nombre: 'Sídney, Australia', latitud: -33.8688, longitud: 151.2093 },
    { nombre: 'Roma, Italia', latitud: 41.9028, longitud: 12.4964 },
    { nombre: 'Pekín, China', latitud: 39.9042, longitud: 116.4074 },
    {
      nombre: 'Ciudad de México, México',
      latitud: 19.4326,
      longitud: -99.1332,
    },
    { nombre: 'El Cairo, Egipto', latitud: 30.0444, longitud: 31.2357 },
    { nombre: 'Río de Janeiro, Brasil', latitud: -22.9068, longitud: -43.1729 },
    { nombre: 'Nueva Delhi, India', latitud: 28.6139, longitud: 77.209 },
    {
      nombre: 'Ciudad del Cabo, Sudáfrica',
      latitud: -33.9249,
      longitud: 18.4241,
    },
    { nombre: 'Moscú, Rusia', latitud: 55.7558, longitud: 37.6176 },
    {
      nombre: 'Dubái, Emiratos Árabes Unidos',
      latitud: 25.2048,
      longitud: 55.2708,
    },
    { nombre: 'Toronto, Canadá', latitud: 43.65107, longitud: -79.347015 },
    {
      nombre: 'Buenos Aires, Argentina',
      latitud: -34.6037,
      longitud: -58.3816,
    },
    { nombre: 'Seúl, Corea del Sur', latitud: 37.5665, longitud: 126.978 },
    { nombre: 'Berlín, Alemania', latitud: 52.52, longitud: 13.405 },
    { nombre: 'Bangkok, Tailandia', latitud: 13.7563, longitud: 100.5018 },
    { nombre: 'Los Ángeles, EE. UU.', latitud: 34.0522, longitud: -118.2437 },
  ];

  const ubicacionesGeneradas = ubicacionesData.map((ubicacion) => ({
    ubicacion_Nombre: ubicacion.nombre,
    latitud: ubicacion.latitud,
    longitud: ubicacion.longitud,
  }));

  console.log(ubicacionesGeneradas);
  return ubicacionesGeneradas;
}

export const initialUbicaciones: SeedUbicaciones = {
  ubicaciones: registrarUbicaciones(),
};
