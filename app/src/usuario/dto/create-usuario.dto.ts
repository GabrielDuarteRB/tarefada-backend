import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Match } from '../decorator/match.decorator';

export class CreateUsuarioDto {

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: "Tamanho mínimo de 2 caracteres" })
  @MaxLength(100, { message: "Tamanho máximo de 100 caracteres" })
  nome: string;

  @ApiProperty()
  @IsEmail({}, { message: "Email inválido" })
  @MaxLength(100, { message: "Tamanho máximo de 100 caracteres" })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  @MaxLength(100, { message: "Senha deve ter no máximo 100 caracteres" })
  senha: string;

  @ApiProperty()
  @IsString()
  @Match('senha', { message: 'As senhas não coincidem' })
  @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  @MaxLength(100, { message: "Senha deve ter no máximo 100 caracteres" })
  confirmarSenha: string;

  @ApiPropertyOptional({
    description: 'Foto de perfil',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  foto?: any;
}
