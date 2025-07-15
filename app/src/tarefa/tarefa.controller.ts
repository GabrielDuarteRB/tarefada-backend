import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBearerAuth } from '@nestjs/swagger'
import { Multer } from 'multer';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { FindAllTarefaDto } from './dto/find-all-tarefa.dto';
import { JwtAuthGuard } from '../usuario/jwt-auth.guard';

@Controller('tarefa')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Get()
  findAll(@Query() query: FindAllTarefaDto){
    try {
      return this.tarefaService.findAll(query);
    } catch (error) {
      return error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number,){
    try {
      return this.tarefaService.findOne(+id);
    } catch (error) {
      return error
    }
  }

  @Post()
  create(
    @Body() createTarefaDto: CreateTarefaDto,
  ) {
    try {
      return this.tarefaService.create(createTarefaDto);
    } catch (error) {
      console.error('Erro no controller:', error);
      throw error;
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('comprovante'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: number,
    @Body() updateTarefaDto: UpdateTarefaDto,
    @UploadedFile() comprovante?: Multer.File
  ) {
    try {
      const base64Comprovante = comprovante ? comprovante.buffer.toString('base64') : null;

      const data = {
        ...updateTarefaDto,
        comprovante: base64Comprovante,
      };
      return this.tarefaService.update(+id, data);
    } catch (error) {
      console.log(error)
      return error
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      return this.tarefaService.delete(+id);
    } catch (error) {
      return error
    }
  }
}
