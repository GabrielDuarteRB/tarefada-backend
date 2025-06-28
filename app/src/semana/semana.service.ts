import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateSemanaDto } from './dto/create-semana.dto';
import { UpdateSemanaDto } from './dto/update-semana.dto';
import { SemanaRepository } from './semana.repository'

@Injectable()
export class SemanaService {
  constructor(
    private readonly semanaRepository: SemanaRepository,
  ) {}

  async create(createSemanaDto: CreateSemanaDto, id: number) {
    const semanaAtiva = await this.findActuallyWeek(id)

    if (semanaAtiva) {
      throw new BadRequestException('Já existe uma semana ativa.');
    }

    const dataInicio = new Date(createSemanaDto.data_inicio);
    const previsaoFim = new Date(dataInicio);
    previsaoFim.setDate(previsaoFim.getDate() + 7);

    const semana = await this.semanaRepository.create({
      data_inicio: createSemanaDto.data_inicio,
      data_fim: createSemanaDto.data_fim,
      data_previsao_fim: previsaoFim.toISOString(),
      criado_por: id,
    })

    await semana.$add('usuarios', id);

    return semana
  }

  async update(id: number, updateSemanaDto: UpdateSemanaDto) {
    const [linhasAfetadas, semana] = await this.semanaRepository.update(id, updateSemanaDto);

    if (linhasAfetadas === 0) {
      throw new NotFoundException(`Semana com id ${id} não encontrada`);
    }

    return semana[0];
  }

  findActuallyWeek(id: number) {
    return this.semanaRepository.findActuallyWeek(id)
  }

  async participated(id_semana: number, id_usuario: number) {
    const semanaAtiva = await this.findActuallyWeek(id_usuario)

    if (semanaAtiva) {
      throw new BadRequestException('Já existe uma semana ativa.');
    }

    return this.semanaRepository.participated({
      id_semana,
      id_usuario
    })


  }

}
