import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { JwtAuthGuard } from '../src/usuario/jwt-auth.guard';
import { TarefaController } from '../src/tarefa/tarefa.controller';
import { TarefaRepository } from '../src/tarefa/tarefa.repository';
import { TarefaService } from '../src/tarefa/tarefa.service';

describe('TarefaController (integration)', () => {
  let app: INestApplication;

  const tarefas = [
    { id_tarefa: 1, titulo: 'Entregar trabalho', id_semana: 3 },
  ];
  const repository = {
    findAll: jest.fn().mockResolvedValue(tarefas),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TarefaController],
      providers: [
        TarefaService,
        { provide: TarefaRepository, useValue: repository },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns tasks from GET /tarefa', async () => {
    await request(app.getHttpServer())
      .get('/tarefa')
      .expect(200)
      .expect(tarefas);

    expect(repository.findAll).toHaveBeenCalledWith({});
  });
});
