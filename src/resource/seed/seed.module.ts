import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AeropuertosModule } from '../aeropuertos/aeropuertos.module';
import { AvionesModule } from '../aviones/aviones.module';
import { FabricantesModule } from '../fabricantes/fabricantes.module';
import { PilotosModule } from '../pilotos/pilotos.module';
import { TarifasClaseModule } from '../tarifas-clase/tarifas-clase.module';
import { TarifasDistanciaModule } from '../tarifas-distancia/tarifa-distancia.module';
import { TrabajadoresModule } from '../trabajadores/trabajadores.module';
import { TripulacionesModule } from '../tripulaciones/tripulaciones.module';
import { UbicacionesModule } from '../ubicaciones/ubicaciones.module';
import { VuelosModule } from '../vuelos/vuelos.module';
import { ModelosModule } from '../modelos/modelos.module';
import { SeedController } from './seed.controller';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';
import { ViajesModule } from '../viajes/viajes.module';

@Module({
  imports: [
    AeropuertosModule,
    AvionesModule,
    FabricantesModule,
    ModelosModule,
    PilotosModule,
    TarifasClaseModule,
    TarifasDistanciaModule,
    TrabajadoresModule,
    TripulacionesModule,
    UbicacionesModule,
    VuelosModule,
    TransaccionModule,
    TripulacionesModule,
    ViajesModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
