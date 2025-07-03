import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository'
import { Usuario } from './entities/usuario.entity'
import { Semana } from '../semana/entities/semana.entity'
import { SemanaUsuario } from '../semana/entities/semana-usuario.entity'
import { Tarefa } from '../tarefa/entities/tarefa.entity'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'chave_ultra_secreta',
      signOptions: { expiresIn: '24h' },
    }),
    SequelizeModule.forFeature([Usuario, Semana, SemanaUsuario, Tarefa])
  ],
  controllers: [UsuarioController],
  providers: [JwtStrategy, UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
