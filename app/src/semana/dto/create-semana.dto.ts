import {
  IsDateString,
  IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateSemanaDto {

  @ApiProperty({ example: '2025-07-01' })
  @IsDateString()
  data_inicio: string;

  @ApiProperty({ example: '2025-07-01', required: false })
  @IsOptional()
  @IsDateString()
  data_fim?: string;
}
