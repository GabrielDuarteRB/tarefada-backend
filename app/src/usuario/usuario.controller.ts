import { Controller, Get, Put, Post, Body, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('foto'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @UploadedFile() foto?: Multer.File
  ) {
    try {
      const base64Comprovante = foto ? foto.buffer.toString('base64') : null;

      const data = {
        ...createUsuarioDto,
        foto: base64Comprovante,
      };

      return this.usuarioService.create(data);
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

  @Put()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('foto'))
  @ApiConsumes('multipart/form-data')
  update(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Request() req,
    @UploadedFile() foto?: Multer.File
  ) {
    try {
      const base64Comprovante = foto ? foto.buffer.toString('base64') : null;

      const data = {
        ...updateUsuarioDto,
        foto: base64Comprovante,
      };

      return this.usuarioService.update(req.user.id_usuario, data);
    } catch (error) {
      return error
    }
  }
}
