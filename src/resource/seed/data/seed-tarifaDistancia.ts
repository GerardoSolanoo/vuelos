import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

interface TarifaDistancia {
  tarifa_Distancia_Nombre: string;
  origenId: number;
  destinoId: number;
  distancia: number;
  tarifa_Distancia_Estado: EstadoDistancia;
  precioTarifa: number;
}

type EstadoDistancia = Estado_Logico;

interface SeedTarifasDistancia {
  tarifasDistancia: TarifaDistancia[];
}

export function registrarTarifaDistancia() {
  const nombresTarifa = [
    'Tarifa A',
    'Tarifa B',
    'Tarifa C',
    'Tarifa D',
    'Tarifa E',
    'Tarifa F',
    'Tarifa G',
    'Tarifa H',
    'Tarifa I',
    'Tarifa J',
  ];

  const estadosDistancia = [Estado_Logico.ACTIVO, Estado_Logico.INACTIVO];

  const tarifasGeneradas = [];

  for (let i = 0; i < 10; i++) {
    const tarifa = generarTarifaDistancia(
      nombresTarifa[i],
      i + 1, // Origen ID
      i + 2, // Destino ID
      (i + 1) * 500, // Distancia
      estadosDistancia[Math.floor(Math.random() * estadosDistancia.length)],
      generarPrecioTarifa(),
    );
    tarifasGeneradas.push(tarifa);
  }

  console.log(tarifasGeneradas);
  return tarifasGeneradas;
}

function generarTarifaDistancia(
  nombre: string,
  origenId: number,
  destinoId: number,
  distancia: number,
  estado: EstadoDistancia,
  precio: number,
): TarifaDistancia {
  return {
    tarifa_Distancia_Nombre: nombre,
    origenId,
    destinoId,
    distancia,
    tarifa_Distancia_Estado: estado,
    precioTarifa: precio,
  };
}

function generarPrecioTarifa() {
  return Math.floor(Math.random() * 900) + 100;
}

export const initialTarifasDistancia: SeedTarifasDistancia = {
  tarifasDistancia: registrarTarifaDistancia(),
};
