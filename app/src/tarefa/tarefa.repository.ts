import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tarefa } from './entities/tarefa.entity'
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { FindAllTarefaDto } from './dto/find-all-tarefa.dto';

@Injectable()
export class TarefaRepository {
  constructor(
    @InjectModel(Tarefa)
    private readonly tarefaModel: typeof Tarefa,
  ) {}

  findAll(query: FindAllTarefaDto) {
    const { status, id_usuario_atribuido, id_semana } = query;

    const where: any = {};

    if (status) where.status = status;
    if (id_usuario_atribuido) where.id_usuario_atribuido = id_usuario_atribuido;
    if (id_semana) where.id_semana = id_semana;

    return this.tarefaModel.findAll({ where })
  }

  findOne(id: number) {
    return this.tarefaModel.findOne({
      where: { id_tarefa: id }
    })
  }

  async create(dados) {
    return this.tarefaModel.create(dados)
  }

  update(id: number, updateTarefaDto: UpdateTarefaDto) {
    console.log(updateTarefaDto)
    return this.tarefaModel.update(updateTarefaDto, {
      where: { id_tarefa: id },
      returning: true
    })
  }

  async delete(id: number) {
    return this.tarefaModel.destroy({
      where: { id_tarefa: id },
    });
  }
}