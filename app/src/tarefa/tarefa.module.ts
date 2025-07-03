import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from './tarefa.service';
import { TarefaRepository } from './tarefa.repository'
import { Tarefa } from './entities/tarefa.entity'
import { Usuario } from '../usuario/entities/usuario.entity'
import { Semana } from '../semana/entities/semana.entity'
import { SemanaModule } from '../semana/semana.module';
import { ExistsSemanaConstraint } from '../common/validators/ExistsSemana.validator'
import { DataDentroDaSemanaConstraint } from '../common/validators/DataDentroDaSemana.validator'

@Module({
  imports: [
    SequelizeModule.forFeature([Tarefa, Usuario, Semana]),
    SemanaModule
  ],
  controllers: [TarefaController],
  providers: [
    TarefaService,
    TarefaRepository,
    ExistsSemanaConstraint,
    DataDentroDaSemanaConstraint,
  ],
})
export class TarefaModule {}
