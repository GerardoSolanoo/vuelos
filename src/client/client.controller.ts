import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('emailvalidation')
  create(@Body() Data: any) {
    let Destinatario = Data.Destinatario;
    return this.clientService.validar_cuenta(Destinatario);
  }

  @Post('solicitarCodigo')
  CodigoVerificacion(@Body() Data: any) {
    let Destinatario = Data.Destinatario;
    return this.clientService.solicitar_Codigo_activacion(Destinatario);
  }

  @Post('passwordupdate')
  actualizar_contraseña(@Body() Data: any) {
    let Destinatario = Data.Destinatario;
    return this.clientService.actualizar_contraseña(Destinatario);
  }

}
