import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { SemanaController } from './semana.controller';
import { SemanaService } from './semana.service';
import { SemanaRepository } from './semana.repository'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Semana } from '../semana/entities/semana.entity'
import { SemanaUsuario } from '../semana/entities/semana-usuario.entity'

@Module({
  imports: [
    SequelizeModule.forFeature([Semana, Usuario, SemanaUsuario])
  ],
  controllers: [SemanaController],
  providers: [SemanaService, SemanaRepository],
  exports: [SequelizeModule, SemanaRepository],
})
export class SemanaModule {}
