import {
  Table,
  Model,
  ForeignKey,
  Column,
} from 'sequelize-typescript';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Semana } from './semana.entity';

@Table({ tableName: 'semana_usuario', timestamps: false, })
export class SemanaUsuario extends Model<SemanaUsuario> {
  @ForeignKey(() => Usuario)
  @Column
  id_usuario: number;

  @ForeignKey(() => Semana)
  @Column
  id_semana: number;
}
