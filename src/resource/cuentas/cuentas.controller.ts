import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Estado } from '../../common/enums/cuentas.enum';

import { Auth } from '../../auth/decorators/auth.decorator';
import { Roles } from '../../common/enums/roles.enum';
import { ActiveUser } from '../../common/decorators/user.decorator';
import { User_Interface } from '../../common/interfaces/user.interface';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  create(@Body() createCuentaDto: CreateCuentaDto) {
    return this.cuentasService.create(createCuentaDto);
  }

  @Get()
  findAll() {
    return this.cuentasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasService.findOne(+id);
  }

  @Post('validarCodigo')
  validarCodigo(@Body() Datos: any) {
    return this.cuentasService.validar_codigo(
      Datos.identificador,
      Datos.codigo,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaDto: UpdateCuentaDto) {
    return this.cuentasService.update(+id, updateCuentaDto);
  }

  @Patch('actualizarCuenta/:identificador')
  actualizarEstadoCuenta(
    @Param('identificador') identificador: string,
    @Body() estado_cuenta: Estado,
  ) {
    let estado: any = estado_cuenta;
    estado = estado.estado_cuenta;
    return this.cuentasService.actualizarEstadoCuenta(identificador, estado);
  }

  @Patch('activarCuenta/:identificador')
  activarCuenta(
    @Param('identificador') identificador: string,
    @Body() Datos: any,
  ) {
    const numero_activacion: any = Datos.numero_activacion;
    return this.cuentasService.activarCuenta(identificador, numero_activacion);
  }

  @Patch('actualizarContrasena/:identificador')
  actualizarContraseña(
    @Param('identificador') identificador: string,
    @Body() Datos: any,
  ) {
    return this.cuentasService.actualizarContraseña(
      identificador,
      Datos.contraseña,
      Datos.codigo,
    );
  }

  @Auth(Roles.ADMIN)
  @Delete(':identificador')
  remove(
    @Param('identificador') identificador: string,
    @ActiveUser() user: User_Interface,
  ) {
    return this.cuentasService.remove(identificador, user);
  }
}
