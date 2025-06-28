import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusTarefa } from '../enum/StatusTarefa';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllTarefaDto {
  @ApiPropertyOptional({ enum: StatusTarefa })
  @IsOptional()
  @IsEnum(StatusTarefa)
  status?: StatusTarefa;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_usuario_atribuido?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_semana?: number;
}
