import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional
} from 'class-validator';

export class CreateRealUsuarioDto {

  @IsString()
  @MinLength(2, { message: "Tamanho mínimo de 2 caracteres" })
  @MaxLength(100, { message: "Tamanho máximo de 100 caracteres" })
  nome: string;

  @IsEmail({}, { message: "Email inválido" })
  @MaxLength(100, { message: "Tamanho máximo de 100 caracteres" })
  email: string;

  @IsString()
  @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  @MaxLength(100, { message: "Senha deve ter no máximo 100 caracteres" })
  senha: string;

  @IsOptional()
  @IsString()
  foto?: string;
}
