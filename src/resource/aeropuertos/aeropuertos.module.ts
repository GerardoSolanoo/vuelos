import { Module } from '@nestjs/common';
import { AeropuertosService } from './aeropuertos.service';
import { AeropuertosController } from './aeropuertos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeropuerto } from './entities/aeropuerto.entity';
import { Ubicacion } from '../ubicaciones/entities/ubicacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aeropuerto, Ubicacion])],
  controllers: [AeropuertosController],
  providers: [AeropuertosService],
  exports: [AeropuertosService],
})
export class AeropuertosModule {}
