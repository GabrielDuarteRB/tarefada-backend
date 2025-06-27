import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table({ tableName: 'usuario', timestamps: false })
export class Usuario extends Model<Usuario> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id_usuario: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  })
  declare nome: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  })
  declare email: string

  @Column({
    type: DataType.STRING(100),
  })
  declare senha: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare foto?: string
}
