import { Module } from '@nestjs/common';
import { TarjetaService } from './tarjeta.service';
import { TarjetaController } from './tarjeta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarjeta } from './entities/tarjeta.entity';
import { TransaccionModule } from '../../common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tarjeta]), TransaccionModule],
  controllers: [TarjetaController],
  providers: [TarjetaService],
  exports: [TarjetaService],
})
export class TarjetaModule {}
