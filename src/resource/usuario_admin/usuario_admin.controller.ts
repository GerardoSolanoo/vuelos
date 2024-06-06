import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioAdminService } from './usuario_admin.service';
import { CreateUsuarioAdminDto } from './dto/create-usuario_admin.dto';
import { UpdateUsuarioAdminDto } from './dto/update-usuario_admin.dto';

@Controller('usuario-admin')
export class UsuarioAdminController {
  constructor(private readonly usuarioAdminService: UsuarioAdminService) {}

  @Post()
  create(@Body() createUsuarioAdminDto: CreateUsuarioAdminDto) {
    return this.usuarioAdminService.create(createUsuarioAdminDto);
  }

  @Get()
  findAll() {
    return this.usuarioAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioAdminDto: UpdateUsuarioAdminDto) {
    return this.usuarioAdminService.update(+id, updateUsuarioAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioAdminService.remove(+id);
  }
}
