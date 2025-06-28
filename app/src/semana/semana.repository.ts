import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Semana } from './entities/semana.entity'
import { SemanaUsuario } from './entities/semana-usuario.entity'
import { UpdateSemanaDto } from './dto/update-semana.dto';

@Injectable()
export class SemanaRepository {
  constructor(
    @InjectModel(Semana)
    private readonly semanaModel: typeof Semana,

    @InjectModel(SemanaUsuario)
    private readonly semanaUsuarioModel: typeof SemanaUsuario,
  ) {}

  async create(dados) {
    return this.semanaModel.create(dados)
  }

  participated(dados) {
    return this.semanaUsuarioModel.create(dados)
  }

  async update(id: number, updateSemanaDto: UpdateSemanaDto) {
    return await this.semanaModel.update(updateSemanaDto, {
      where: { id_semana: id },
      returning: true,
    });
  }

  findActuallyWeek(id: number) {
    const hoje = new Date()
    hoje.setUTCHours(23, 59, 59, 999);

    return this.semanaModel.findOne({
      where: {
        data_fim: { [Op.is]: null },
        data_previsao_fim: {
          [Op.gte]: hoje,
        }
      },
      include: [
        {
          association: 'usuarios',
          where: { id_usuario: id },
          through: { attributes: [] },
          attributes: { exclude: ['senha'] },
          required: true,
        },
      ],
    });
  }

}