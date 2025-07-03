import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Semana } from '../../semana/entities/semana.entity'; // ajuste conforme seu caminho

@ValidatorConstraint({ name: 'ExistsSemana', async: true })
@Injectable()
export class ExistsSemanaConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Semana)
    private readonly semanaModel: typeof Semana,
  ) {}

  async validate(id: number): Promise<boolean> {
    try {
      const semana = await this.semanaModel.findByPk(id);
      return !!semana;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `A semana com id ${args.value} não existe.`;
  }
}

export function ExistsSemana(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ExistsSemanaConstraint,
    });
  };
}
