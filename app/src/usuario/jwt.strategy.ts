import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioRepository } from './usuario.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'chave_ultra_secreta',
    });
  }

  async validate(payload: any) {
    const usuario = await this.usuarioRepository.findByEmail(payload.email);
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const { senha, ...usuarioSemSenha } = usuario.get({ plain: true });
    return usuarioSemSenha;
  }
}
