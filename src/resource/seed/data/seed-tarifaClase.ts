import { Estado_Logico } from 'src/common/enums/estado_logico.enum';

interface TarifaClase {
  tarifa_Clase_Nombre: string;
  tarifa_Clase_Estado: EstadoTarifa;
  precioTarifa: number;
}

type EstadoTarifa = Estado_Logico;

interface SeedTarifasClase {
  tarifasClase: TarifaClase[];
}

export function registrar_Tarifa_Clase() {
  const clase_Nombre = [
    'Económica',
    'Primera Clase',
    'Business',
    'Premium Economy',
    'Premium Business',
    'Deluxe Class',
    'Standard ',
  ];

  const clase_Estado = [Estado_Logico.ACTIVO, Estado_Logico.INACTIVO];

  const tarifas_generadas = [];

  for (let i = 0; i < 10; i++) {
    const tarifa = generar_Tarifas_Clase(
      clase_Nombre[Math.floor(Math.random() * clase_Nombre.length)],
      clase_Estado[Math.floor(Math.random() * clase_Estado.length)],
    );
    tarifas_generadas.push(tarifa);
  }

  console.log(tarifas_generadas);
  return tarifas_generadas;
}

function generar_Tarifas_Clase(nombre: string, estado: EstadoTarifa) {
  const tarifa: TarifaClase = {
    tarifa_Clase_Nombre: nombre,
    tarifa_Clase_Estado: estado,
    precioTarifa: generar_Precios_Tarifa(),
  };
  return tarifa;
}

function generar_Precios_Tarifa() {
  return Math.floor(Math.random() * 900) + 100;
}
