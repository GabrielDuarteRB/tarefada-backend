import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsString,
  IsOptional,
  IsEnum
} from 'class-validator';
import { CreateTarefaDto } from './create-tarefa.dto';
import { StatusTarefa } from '../enum/StatusTarefa'

export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id_usuario_atribuido?: number

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  data_termino?: string

  @ApiPropertyOptional({
    description: 'Status da tarefa',
    enum: StatusTarefa,
    default: StatusTarefa.PENDENTE
  })
  @IsOptional()
  @IsEnum(StatusTarefa)
  status?: StatusTarefa;

  @ApiPropertyOptional({
    description: 'Comprovante da tarefa',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  comprovante?: any;
}
