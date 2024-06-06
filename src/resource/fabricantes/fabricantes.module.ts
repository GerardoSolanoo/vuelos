import { Module } from '@nestjs/common';
import { FabricantesService } from './fabricantes.service';
import { FabricantesController } from './fabricantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fabricante } from './entities/fabricante.entity';
import { ModeloAvion } from '../modelos/entities/modelo-avion.entity';
import { TransaccionModule } from '../../common/transaction/transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fabricante, ModeloAvion]),
    TransaccionModule,
  ],
  controllers: [FabricantesController],
  providers: [FabricantesService],
  exports: [FabricantesService],
})
export class FabricantesModule {}
