import { Module } from '@nestjs/common';
import { TarifaDistanciaController } from './tarifa-distancia.controller';
import { TarifaDistanciaService } from './tarifa-distancia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarifaDistancia } from './entities/tarifa-distancia.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([TarifaDistancia]), TransaccionModule],
  controllers: [TarifaDistanciaController],
  providers: [TarifaDistanciaService],
  exports: [TarifaDistanciaService],
})
export class TarifasDistanciaModule {}
