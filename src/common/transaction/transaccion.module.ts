import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionService } from './transaccion.service';

@Module({
  controllers: [],
  providers: [TransaccionService],
  exports: [TransaccionService],
})
export class TransaccionModule {}
