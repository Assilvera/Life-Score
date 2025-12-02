import { Injectable } from '@nestjs/common';
import { ActionRepository } from '../../domain/repositories/action.repository';
import { Action } from '../../domain/entities/action.entity';

@Injectable()
export class GetActionsUseCase {
  constructor(private readonly actionRepository: ActionRepository) {}

  async execute(): Promise<Action[]> {
    return this.actionRepository.findAll();
  }
}
