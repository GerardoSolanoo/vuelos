import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../resource/usuario/usuario.module';
import { CuentasModule } from '../resource/cuentas/cuentas.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/jwt.constant';
import { ClientModule } from '../client/client.module';
import { TransaccionModule } from '../common/transaction/transaccion.module';

@Module({
  imports: [
    UsuarioModule,
    CuentasModule,
    ClientModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TransaccionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthModule],
})
export class AuthModule {}
