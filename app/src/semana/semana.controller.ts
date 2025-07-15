import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SemanaService } from './semana.service';
import { CreateSemanaDto } from './dto/create-semana.dto';
import { UpdateSemanaDto } from './dto/update-semana.dto';
import { JwtAuthGuard } from '../usuario/jwt-auth.guard';

@Controller('semana')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SemanaController {
  constructor(private readonly semanaService: SemanaService) {}

  @Post()
  create(@Body() createSemanaDto: CreateSemanaDto, @Request() req) {
    try {
      return this.semanaService.create(createSemanaDto, req.user.id_usuario);
    } catch (error) {
      return error
    }
  }

  @Post(':id/participar')
  participated(@Param('id') id: string, @Request() req) {
    try {
      return this.semanaService.participated(+id, req.user.id_usuario);
    } catch (error) {
      console.log(error)
      return error
    }
  }

  @Get('atual')
  findActuallyWeek(@Request() req) {
    try {
      return this.semanaService.findActuallyWeek(req.user.id_usuario);
    } catch (error) {
      return error
    }
  }

  @Delete('atual')
  deleteActuallyWeek(@Request() req) {
    try {
      return this.semanaService.deleteActuallyWeek(req.user.id_usuario);
    } catch (error) {
      return error
    }
  }

  @Get('ranking')
  getRankingAtLastWeek(@Request() req) {
    try {
      return this.semanaService.getRankingAtLastWeek(req.user.id_usuario);
    } catch (error) {
      return error
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemanaDto: UpdateSemanaDto) {
    try {
      return this.semanaService.update(+id, updateSemanaDto);
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
