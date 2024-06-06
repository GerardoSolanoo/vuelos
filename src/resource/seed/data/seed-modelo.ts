import { CategoriaModelo } from 'src/common/enums/categoria-modelo.enum';
import { ESTADO_OPERATIVO } from 'src/common/enums/estado-operativo.enum';

interface ModeloAvion {
  modelo_Avion_Nombre: string;
  modelo_Avion_Estado: Estado_Avion;
  modelo_Avion_Categoria: Categoria_Avion;
}

type Estado_Avion = ESTADO_OPERATIVO;
type Categoria_Avion = CategoriaModelo;

interface SeedModelosAvion {
  modelosAvion: ModeloAvion[];
}

export function registrarModelosAvion() {
  const modelos_Avion: string[] = [
    'SkyRanger X210',
    'AeroMaster G5',
    'JetStream 4000',
    'CloudChaser M2',
    'Horizon S150',
    'EagleEye A320',
    'StratoCruiser 750',
    'HawkSpirit Z300',
    'Vortex T120',
    'FalconFlyer D880',
  ];

  const categorias_Avion = [
    CategoriaModelo.COMERCIAL,
    CategoriaModelo.PRIVADO,
    CategoriaModelo.MILITAR,
  ];

  const estados_Avion = [
    ESTADO_OPERATIVO.OPERATIVO,
    ESTADO_OPERATIVO.MANTENIMIENTO,
    ESTADO_OPERATIVO.FUERA_DE_SERVICIO,
  ];

  const modelos_generados = [];

  for (let i = 0; i < 100; i++) {
    const modelo = generar_ModelosAvion(
      modelos_Avion[Math.floor(Math.random() * modelos_Avion.length)],
      estados_Avion[Math.floor(Math.random() * estados_Avion.length)],
      categorias_Avion[Math.floor(Math.random() * categorias_Avion.length)],
    );
    modelos_generados.push(modelo);
  }
  return modelos_generados;
}

function generar_ModelosAvion(
  nombre: string,
  estado: Estado_Avion,
  categoria: Categoria_Avion,
): ModeloAvion {
  const modelo: ModeloAvion = {
    modelo_Avion_Nombre: nombre,
    modelo_Avion_Estado: estado,
    modelo_Avion_Categoria: categoria,
  };
  return modelo;
}
