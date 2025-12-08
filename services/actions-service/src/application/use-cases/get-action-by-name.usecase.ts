import { Injectable, NotFoundException } from '@nestjs/common';
import { ActionRepository } from '../../domain/repositories/action.repository';

@Injectable()
export class GetActionByNameUseCase {
  constructor(private readonly repo: ActionRepository) {}

  async execute(name: string) {
    const action = await this.repo.findByName(name);

    if (!action) {
      throw new NotFoundException(`Action "${name}" not found`);
    }

    return action;
  }
}
