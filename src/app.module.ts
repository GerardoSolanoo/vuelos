import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CuentasModule } from './resource/cuentas/cuentas.module';
import { UsuarioModule } from './resource/usuario/usuario.module';
import { ClientModule } from './client/client.module';
import { TransaccionModule } from './common/transaction/transaccion.module';
import { ClienteModule } from './resource/cliente/cliente.module';
import { TarjetaModule } from './resource/tarjeta/tarjeta.module';
import { AeropuertosModule } from './resource/aeropuertos/aeropuertos.module';
import { AvionesModule } from './resource/aviones/aviones.module';
import { FabricantesModule } from './resource/fabricantes/fabricantes.module';
import { ModelosModule } from './resource/modelos/modelos.module';
import { PilotosModule } from './resource/pilotos/pilotos.module';
import { TrabajadoresModule } from './resource/trabajadores/trabajadores.module';
import { TripulacionesModule } from './resource/tripulaciones/tripulaciones.module';
import { UbicacionesModule } from './resource/ubicaciones/ubicaciones.module';
//import { ViajesModule } from './resource/viajes/viajes.module';
import { VuelosModule } from './resource/vuelos/vuelos.module';
import { TarifasClaseModule } from './resource/tarifas-clase/tarifas-clase.module';
import { TarifasDistanciaModule } from './resource/tarifas-distancia/tarifa-distancia.module';
import { UsuarioAdminModule } from './resource/usuario_admin/usuario_admin.module';
import { SeedModule } from './resource/seed/seed.module';
import { ViajesModule } from './resource/viajes/viajes.module';

const dotenv_Config = require('dotenv').config();
const secret = dotenv_Config.parsed;
const host_develop = dotenv_Config.parsed.PG_HOST_DEVELOP;
const host_production = dotenv_Config.parsed.PG_HOST_PRODUCTION;
const database = dotenv_Config.parsed.PG_DATABASE;
const user = dotenv_Config.parsed.PG_USER;
const user_develop = dotenv_Config.parsed.PG_USER_DEVELOP;
const password = dotenv_Config.parsed.PG_PASSWORD;
const password_develop = dotenv_Config.parsed.PG_PASSWORD_DEVELOP;

const host_local = secret.PG_HOST_LOCAL;
const database_local = secret.PG_DATABASE_LOCAL;
const user_local = secret.PG_USER_LOCAL;
const password_local = secret.PG_PASSWORD_LOCAL;

const host_azure = secret.PG_HOST_AZURE;
const database_azure = secret.PG_DATABASE_AZURE;
const user_azure = secret.PG_USER_AZURE;
const password_azure = secret.PG_PASSWORD_AZURE;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host_local,
      port: 5432,
      username: user_local,
      password: password_local,
      database: database_local,
      autoLoadEntities: true,
      synchronize: true,
      //extra: {
      //  ssl: false,
      //  sslmode: 'require',
      //},
    }),
    AuthModule,
    CuentasModule,
    UsuarioModule,
    UsuarioAdminModule,
    ClientModule,
    TransaccionModule,
    ClienteModule,
    TarjetaModule,
    AeropuertosModule,
    AvionesModule,
    FabricantesModule,
    ModelosModule,
    PilotosModule,
    TrabajadoresModule,
    TripulacionesModule,
    UbicacionesModule,
    VuelosModule,
    TarifasClaseModule,
    TarifasDistanciaModule,
    ViajesModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
