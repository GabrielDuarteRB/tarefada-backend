import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from './usuario.repository'
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, saltRounds);

    return this.usuarioRepository.create({
      nome: createUsuarioDto.nome,
      email: createUsuarioDto.email,
      senha: hashedPassword,
      foto: createUsuarioDto.foto,
    })
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const usuario = await this.usuarioRepository.findByEmail(loginUsuarioDto.email);
    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(loginUsuarioDto.senha, usuario.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { sub: usuario.id_usuario, email: usuario.email };

    const access_token = this.jwtService.sign(payload);

    const { senha, ...usuarioSemSenha } = usuario.get({ plain: true });

    return {
      access_token,
      usuario: usuarioSemSenha,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
