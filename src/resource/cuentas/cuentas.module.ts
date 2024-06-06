import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { UsuarioService } from '../usuario/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { TransaccionModule } from '../../common/transaction/transaccion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cuenta, Usuario]),
    UsuarioModule,
    TransaccionModule,
  ],
  controllers: [CuentasController],
  providers: [CuentasService],
  exports: [CuentasService],
})
export class CuentasModule {}
