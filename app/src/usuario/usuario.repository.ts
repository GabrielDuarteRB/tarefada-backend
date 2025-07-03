import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity'
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
  ) {}

  async create(dados) {
    return this.usuarioModel.create(dados)
  }

  findByEmail(email: string) {
    return this.usuarioModel.findOne({ where: { email } });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioModel.update(updateUsuarioDto, {
       where: { id_usuario: id },
       returning: true
    })
  }
}