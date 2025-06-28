import { Table, Model, Column, DataType, HasMany, BelongsToMany } from 'sequelize-typescript'
import { Exclude } from 'class-transformer';
import { Semana } from '../../semana/entities/semana.entity'
import { SemanaUsuario } from '../../semana/entities/semana-usuario.entity'

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
  @Exclude({ toPlainOnly: true })
  declare senha: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare foto?: string

  @HasMany(() => Semana)
  semanas_criadas: Semana[]

  @BelongsToMany(() => Semana, () => SemanaUsuario)
  semanas: Semana[];

  toJSON(): Record<string, any> {
    const values: Record<string, any> = { ...this.get() };
    delete values.senha;
    return values;
  }
}
