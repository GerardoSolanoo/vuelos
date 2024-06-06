import { Module } from '@nestjs/common';
import { AvionesService } from './aviones.service';
import { AvionesController } from './aviones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avion } from './entities/avion.entity';
import { ModeloAvion } from '../modelos/entities/modelo-avion.entity';
import { Fabricante } from '../fabricantes/entities/fabricante.entity';
import { TransaccionModule } from '../../common/transaction/transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Avion, ModeloAvion, Fabricante]),
    TransaccionModule,
  ],
  controllers: [AvionesController],
  providers: [AvionesService],
  exports: [AvionesService],
})
export class AvionesModule {}
