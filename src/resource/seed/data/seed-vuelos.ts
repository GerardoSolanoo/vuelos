import { Estado_Viaje } from 'src/common/enums/estado-viaje.enum';

interface Vuelo {
  avion_Id: number;
  fecha: Date;
  piloto_Id: number;
  copiloto_Id: number;
  tripulacion_ID: number;
  horaSalida: Date;
  pasajerosTotales: number;
  pasajerosApartados: number;
  estado: EstadoViaje;
  tarifa_Clase_Id: number;
  tarifa_distancia_Id: number;
}

type EstadoViaje = Estado_Viaje;

interface SeedVuelos {
  vuelos: Vuelo[];
}

export function registrar_Vuelos(
  pilotos: any,
  tripulacion: any,
  tarifasClase: any,
  tarifasDistancia: any,
  aviones: any,
) {
  const array_Pilotos = pilotos;
  const array_Tripulacion = tripulacion;
  const array_Tarifas_Clase = tarifasClase;
  const array_Tarifas_Distancia = tarifasDistancia;
  const array_Estados = [
    Estado_Viaje.POR_INICIAR,
    Estado_Viaje.EN_CURSO,
    Estado_Viaje.FINALIZADO,
  ];
  const array_Aviones = aviones;

  const vuelos_generados = [];

  for (let i = 0; i < 100; i++) {
    const fecha = new Date(generar_fechas());
    const horaSalida = generar_horas(fecha);

    const vuelo: Vuelo = {
      avion_Id: array_Aviones[Math.floor(Math.random() * array_Aviones.length)],
      fecha: fecha,
      piloto_Id:
        array_Pilotos[Math.floor(Math.random() * array_Pilotos.length)],
      copiloto_Id:
        array_Pilotos[Math.floor(Math.random() * array_Pilotos.length)],
      tripulacion_ID:
        array_Tripulacion[Math.floor(Math.random() * array_Tripulacion.length)]
          .tripulacion_ID,
      horaSalida: horaSalida,
      pasajerosTotales: Math.floor(Math.random() * 200),
      pasajerosApartados: Math.floor(Math.random() * 200),
      estado: array_Estados[Math.floor(Math.random() * array_Estados.length)],
      tarifa_Clase_Id:
        array_Tarifas_Clase[
          Math.floor(Math.random() * array_Tarifas_Clase.length)
        ],
      tarifa_distancia_Id:
        array_Tarifas_Distancia[
          Math.floor(Math.random() * array_Tarifas_Distancia.length)
        ],
    };
    vuelos_generados.push(vuelo);
  }

  return vuelos_generados;
}

function generar_horas(fecha: Date) {
  const hora = Math.floor(Math.random() * 24);
  const minutos = Math.floor(Math.random() * 59);
  fecha.setHours(hora, minutos, 0, 0);
  return new Date(fecha);
}

function generar_fechas() {
  const año = Math.floor(Math.random() * (2024 - 2015 + 1)) + 2015;
  const mes = Math.floor(Math.random() * 12);
  const diasEnMes = new Date(año, mes + 1, 0).getDate();
  const dia = Math.floor(Math.random() * diasEnMes) + 1;
  return new Date(año, mes, dia).toISOString().split('T')[0];
}
