import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { Semana } from '../../semana/entities/semana.entity'
import { StatusTarefa } from '../enum/StatusTarefa'

@Table({ tableName: 'tarefa', timestamps: false })
export class Tarefa extends Model<Tarefa> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id_tarefa!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @ForeignKey(() => Usuario)
  id_usuario_atribuido?: number | null

  @Column({
    type: DataType.INTEGER
  })
  @ForeignKey(() => Semana)
  id_semana: number

  @Column({
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  })
  titulo: string

  @Column({
    type: DataType.DATE,
  })
  data_inicio: string

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  data_termino?: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  ponto: number

  @Column({
    type: DataType.ENUM(...Object.values(StatusTarefa)),
    allowNull: true,
    defaultValue: StatusTarefa.NAO_CONCLUIDA,
  })
  status: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  comprovante: string

  @BelongsTo(() => Usuario)
  usuario_atribuido: Usuario

  @BelongsTo(() => Semana)
  semana: Semana
}
