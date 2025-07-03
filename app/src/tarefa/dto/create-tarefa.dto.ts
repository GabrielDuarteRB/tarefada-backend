import {
  IsDateString,
  IsInt,
  IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExistsSemana } from '../../common/validators/ExistsSemana.validator'
import { DataDentroDaSemana } from '../../common/validators/DataDentroDaSemana.validator'

export class CreateTarefaDto {

  @ApiProperty()
  @IsInt()
  @ExistsSemana()
  id_semana: number

  @ApiProperty()
  @IsString()
  titulo: string

  @ApiProperty()
  @IsDateString()
  @DataDentroDaSemana()
  data_inicio: string

  @ApiProperty()
  @IsInt()
  ponto: number
}
