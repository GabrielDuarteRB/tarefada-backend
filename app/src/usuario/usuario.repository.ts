import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity'

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
}