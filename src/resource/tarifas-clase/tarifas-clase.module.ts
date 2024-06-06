import { Module } from '@nestjs/common';
import { TarifaClaseController } from './tarifas-clase.controller';
import { TarifaClaseService } from './tarifas-clase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarifaClase } from './entities/tarifa-clase.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([TarifaClase]), TransaccionModule],
  controllers: [TarifaClaseController],
  providers: [TarifaClaseService],
  exports: [TarifaClaseService],
})
export class TarifasClaseModule {}
