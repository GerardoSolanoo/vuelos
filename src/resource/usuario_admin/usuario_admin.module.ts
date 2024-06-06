import { Module } from '@nestjs/common';
import { UsuarioAdminService } from './usuario_admin.service';
import { UsuarioAdminController } from './usuario_admin.controller';
import { UsuarioAdmin } from './entities/usuario_admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from '../cuentas/entities/cuenta.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UsuarioAdmin, Cuenta]) ],
  controllers: [UsuarioAdminController],
  providers: [UsuarioAdminService],
  exports: [UsuarioAdminService]
})
export class UsuarioAdminModule {}
