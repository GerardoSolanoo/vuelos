import { ESTADO_OPERATIVO } from 'src/common/enums/estado-operativo.enum';
import { Estado_Logico } from 'src/common/enums/estado_logico.enum';
import { TipoMotores } from 'src/common/enums/tipo-motores.enum';
interface Avion {
  modeloAvionId: number;
  fabricanteId: number;
  avion_Capacidad_Pasajeros: number;
  avion_Capacidad_Carga: number;
  avion_Velocidad_Maxima: number;
  avion_Anio_Fabricacion: number;
  avion_Estado_Operativo: Estado_Operativo;
  avion_Estado_Logico: EstadoLogico;
  avion_Tipo_Motor: string;
  avion_Autonomia: string;
}

type Estado_Operativo = ESTADO_OPERATIVO;
type EstadoLogico = Estado_Logico;

interface SeedAviones {
  aviones: Avion[];
}

export function registrarAviones(fabricantes: any, modelos: any) {
  const tipos_Motores = [
    TipoMotores.TURBINA,
    TipoMotores.HELICE,
    TipoMotores.REACCION,
    TipoMotores.PISTONES,
  ];

  const estado_Operativo = [
    ESTADO_OPERATIVO.OPERATIVO,
    ESTADO_OPERATIVO.MANTENIMIENTO,
    ESTADO_OPERATIVO.DESCOMPUESTO,
    ESTADO_OPERATIVO.FUERA_DE_SERVICIO,
    ESTADO_OPERATIVO.NO_DISPONIBLE,
  ];

  const estado_Logico = [Estado_Logico.ACTIVO, Estado_Logico.INACTIVO];

  const autonomia = [
    '1000 km',
    '1200 km',
    '1100 km',
    '1050 km',
    '1150 km',
    '1080 km',
    '1100 km',
    '1150 km',
    '1120 km',
    '1200 km',
  ];

  const fabricantes_array: [] = fabricantes;

  const modelos_array: [] = modelos;

  const aviones_generados = [];

  for (let i = 0; i < 100; i++) {
    const avion: Avion = {
      modeloAvionId:
        modelos_array[Math.floor(Math.random() * modelos_array.length)],
      fabricanteId:
        fabricantes_array[Math.floor(Math.random() * fabricantes_array.length)],
      avion_Capacidad_Pasajeros: numero_Random_Con_Limite(150, 200),
      avion_Capacidad_Carga: numero_Random_Con_Limite(2000, 2500),
      avion_Velocidad_Maxima: numero_Random_Con_Limite(850, 930),
      avion_Anio_Fabricacion: numero_Random_Con_Limite(2010, 2024),
      avion_Estado_Operativo:
        estado_Operativo[Math.floor(Math.random() * estado_Operativo.length)],
      avion_Estado_Logico:
        estado_Logico[Math.floor(Math.random() * estado_Logico.length)],
      avion_Tipo_Motor:
        tipos_Motores[Math.floor(Math.random() * tipos_Motores.length)],
      avion_Autonomia: autonomia[Math.floor(Math.random() * autonomia.length)],
    };
    aviones_generados.push(avion);
  }

  return aviones_generados;
}

function numero_Random_Con_Limite(
  limite_maximo: number,
  limite_minimo: number,
): number {
  return Math.floor(
    Math.random() * (limite_maximo - limite_minimo) + limite_minimo,
  );
}
