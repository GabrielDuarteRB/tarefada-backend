import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Semana } from '../../semana/entities/semana.entity';

@ValidatorConstraint({ name: 'DataDentroDaSemana', async: true })
@Injectable()
export class DataDentroDaSemanaConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Semana)
    private readonly semanaModel: typeof Semana,
  ) {}

  async validate(_: any, args: ValidationArguments): Promise<boolean> {
    const { id_semana, data_inicio } = args.object as any;

    if (!id_semana || !data_inicio) return true;

    const semana: any = await this.semanaModel.findByPk(id_semana);
    if (!semana.dataValues || !semana.dataValues.data_inicio) return false;

    const inicio = new Date(semana.dataValues.data_inicio);
    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 7);
    console.log(fim)

    const data = new Date(data_inicio);
    return data >= inicio && data <= fim;
  }

  defaultMessage(args: ValidationArguments) {
    return 'A data de início deve estar dentro da semana informada.';
  }
}

export function DataDentroDaSemana(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'DataDentroDaSemana',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: DataDentroDaSemanaConstraint,
    });
  };
}
