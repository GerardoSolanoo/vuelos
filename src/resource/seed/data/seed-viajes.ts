import { Estado_Viaje } from 'src/common/enums/estado-viaje.enum';
import { Avion } from 'src/resource/aviones/entities/avion.entity';
import { Vuelo } from 'src/resource/vuelos/entities/vuelo.entity';

interface Viaje {
  fechaSalida: Date;
  fechaLlegada: Date;
  estadoViaje: Estado_Viaje;
  numeroAvion: number;
  aeropuertoDestino: number;
  aeropuertoOrigen: number;
  vueloId: number;
}

interface SeedViajes {
  viajes: Viaje[];
}

export function registrarViajes(
  aviones: Avion[],
  aeropuertos: any,
  vuelos: Vuelo[],
) {
  const arrayEstados = [
    Estado_Viaje.POR_INICIAR,
    Estado_Viaje.EN_CURSO,
    Estado_Viaje.FINALIZADO,
  ];

  const viajesGenerados = [];

  for (let i = 0; i < 100; i++) {
    const aeropuertoDestinoIndex = Math.floor(
      Math.random() * aeropuertos.length,
    );
    const aeropuertoDestino = aeropuertos[aeropuertoDestinoIndex];

    const aeropuertoOrigenIndex = Math.floor(
      Math.random() * aeropuertos.length,
    );
    const aeropuertoOrigen = aeropuertos[aeropuertoOrigenIndex];

    const vueloIndex = Math.floor(Math.random() * vuelos.length);
    const vuelo = vuelos[vueloIndex];

    const viaje: Viaje = {
      fechaSalida: generarFechas(),
      fechaLlegada: generarFechas(),
      estadoViaje:
        arrayEstados[Math.floor(Math.random() * arrayEstados.length)],
      numeroAvion: aviones[Math.floor(Math.random() * aviones.length)].avion_Id,
      aeropuertoDestino:
        aeropuertos[Math.floor(Math.random() * aeropuertos.length)].id,
      aeropuertoOrigen:
        aeropuertos[Math.floor(Math.random() * aeropuertos.length)].id,
      vueloId: vuelos[Math.floor(Math.random() * vuelos.length)].Vuelo_ID,
    };
    viajesGenerados.push(viaje);
  }
  return viajesGenerados;
}

function generarFechas() {
  const startDate = new Date();
  const endDate = new Date(startDate);

  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30));

  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  return randomDate;
}
