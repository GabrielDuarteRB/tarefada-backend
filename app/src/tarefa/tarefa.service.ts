import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { FindAllTarefaDto } from './dto/find-all-tarefa.dto';
import { TarefaRepository } from './tarefa.repository'

@Injectable()
export class TarefaService {
  constructor(
    private readonly tarefaRepository: TarefaRepository,
  ) {}

  findAll(query: FindAllTarefaDto) {
    return this.tarefaRepository.findAll(query);
  }

  async findOne(id: number) {
    const tarefa = await this.tarefaRepository.findOne(id);

    if (!tarefa) {
      throw new NotFoundException(`Tarefa com id ${id} não encontrada`);
    }
    return tarefa;
  }

  create(createTarefaDto: CreateTarefaDto) {
    return this.tarefaRepository.create({
      id_semana: createTarefaDto.id_semana,
      titulo: createTarefaDto.titulo,
      data_inicio: createTarefaDto.data_inicio,
      ponto: createTarefaDto.ponto
    })
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto) {
    const [linhasAfetadas, tarefa] = await this.tarefaRepository.update(id, updateTarefaDto);

    console.log(tarefa[0])

    if (linhasAfetadas === 0) {
      throw new NotFoundException(`Tarefa com id ${id} não encontrada`);
    }

    return tarefa[0];
  }

  async delete(id: number) {
    const deletado =  this.tarefaRepository.delete(id);

    if (!deletado) {
      throw new NotFoundException(`Tarefa com id ${id} não encontrada`);
    }

    return deletado;
  }
}
