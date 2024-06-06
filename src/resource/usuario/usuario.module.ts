import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Cuenta } from '../cuentas/entities/cuenta.entity';
import { CuentasModule } from '../cuentas/cuentas.module';
@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Cuenta])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
