import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('create')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return this.usuarioService.create(createUsuarioDto);
    } catch (error) {
      return error
    }
  }

  @Post('login')
  findAll(@Body() loginUsuarioDto: LoginUsuarioDto) {
    try {
      return this.usuarioService.login(loginUsuarioDto);
    } catch (error) {
      return error
    }
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  findMe(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      return error
    }
  }
}
