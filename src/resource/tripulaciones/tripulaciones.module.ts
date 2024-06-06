import { Module } from '@nestjs/common';
import { TripulacionesService } from './tripulaciones.service';
import { TripulacionesController } from './tripulaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tripulacion } from './entities/tripulacion.entity';
import { Trabajador } from '../trabajadores/entities/trabajador.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tripulacion, Trabajador]),
    TransaccionModule,
  ],
  controllers: [TripulacionesController],
  providers: [TripulacionesService],
  exports: [TripulacionesService],
})
export class TripulacionesModule {}
