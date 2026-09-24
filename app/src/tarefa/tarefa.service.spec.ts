import { NotFoundException } from '@nestjs/common';
import { TarefaRepository } from './tarefa.repository';
import { TarefaService } from './tarefa.service';

describe('TarefaService', () => {
  it('throws NotFoundException when the task does not exist', async () => {
    const repository = {
      findOne: jest.fn().mockResolvedValue(null),
    } as unknown as TarefaRepository;
    const service = new TarefaService(repository);

    await expect(service.findOne(42)).rejects.toBeInstanceOf(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith(42);
  });
});
