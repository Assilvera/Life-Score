import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { ActionRepository } from '../../domain/repositories/action.repository';
import { Action } from '../../domain/entities/action.entity';
import { CreateActionDto } from '../dto/create-action.dto';

@Injectable()
export class CreateActionUseCase {
  constructor(
    @Inject('ActionRepository')
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(input: CreateActionDto): Promise<Action> {
    const existing = await this.actionRepository.findByCode(input.code);
    if (existing) {
      throw new BadRequestException('Action with this code already exists');
    }

    const action = Action.create({
      code: input.code,
      title: input.title,
      category: input.category,
      basePoints: input.basePoints,
      difficulty: input.difficulty,
      description: input.description,
      coinsReward: input.coinsReward,
    });

    return this.actionRepository.create(action);
  }
}
