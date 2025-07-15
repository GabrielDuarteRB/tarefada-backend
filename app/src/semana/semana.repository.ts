import { Injectable } from '@nestjs/common';
import { InjectModel, } from '@nestjs/sequelize';
import { Op, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
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

    private readonly sequelize: Sequelize
  ) {}

  findOne(id: number) {
    return this.semanaModel.findByPk(id)
  }

  async create(dados) {
    return this.semanaModel.create(dados)
  }

  participated(dados) {
    return this.semanaUsuarioModel.create(dados)
  }

  deleteActuallyWeek(id: number) {
    return this.semanaUsuarioModel.destroy({
      where: { id_usuario: id }
    });
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

  async getRankingAtLastWeek(id_usuario: number) {
    const query = `
      SELECT *,
            RANK() OVER (ORDER BY total_pontos DESC) AS posicao
      FROM (
        SELECT
          t.id_usuario_atribuido AS id_usuario,
          u.nome,
          SUM(t.ponto) AS total_pontos
        FROM tarefa t
        JOIN usuario u ON u.id_usuario = t.id_usuario_atribuido
        WHERE t.id_semana = (
          SELECT su.id_semana
          FROM semana_usuario su
          WHERE su.id_usuario = :id_usuario
          ORDER BY su.id_semana DESC
          LIMIT 1
        )
        AND t.status = 'concluida'
        GROUP BY t.id_usuario_atribuido, u.nome
      ) AS ranking;
    `;

    return await this.sequelize.query(query, {
      replacements: { id_usuario },
      type: QueryTypes.SELECT,
    });
  }
}