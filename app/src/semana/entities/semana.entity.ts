import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'
import { Usuario } from '../../usuario/entities/usuario.entity'
import { SemanaUsuario } from './semana-usuario.entity'

@Table({ tableName: 'semana', timestamps: false })
export class Semana extends Model<Semana> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id_semana: number

  @Column({
    type: DataType.DATE,
  })
  data_inicio: string

  @Column({
    type: DataType.DATE,
  })
  data_previsao_fim: string

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  data_fim?: string | null

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
  })
  criado_por: number

  @BelongsTo(() => Usuario)
  criador: Usuario;

  @BelongsToMany(() => Usuario, () => SemanaUsuario)
  usuarios: Usuario[];
}
