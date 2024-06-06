import { Module } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloAvion } from './entities/modelo-avion.entity';
import { TransaccionModule } from '../../common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModeloAvion]), TransaccionModule],
  controllers: [ModelosController],
  providers: [ModelosService],
  exports: [ModelosService],
})
export class ModelosModule {}
