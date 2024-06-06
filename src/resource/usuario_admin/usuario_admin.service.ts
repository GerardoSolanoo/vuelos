import { Injectable } from '@nestjs/common';
import { CreateUsuarioAdminDto } from './dto/create-usuario_admin.dto';
import { UpdateUsuarioAdminDto } from './dto/update-usuario_admin.dto';

@Injectable()
export class UsuarioAdminService {
  create(createUsuarioAdminDto: CreateUsuarioAdminDto) {
    return 'This action adds a new usuarioAdmin';
  }

  findAll() {
    return `This action returns all usuarioAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioAdmin`;
  }

  update(id: number, updateUsuarioAdminDto: UpdateUsuarioAdminDto) {
    return `This action updates a #${id} usuarioAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioAdmin`;
  }
}
