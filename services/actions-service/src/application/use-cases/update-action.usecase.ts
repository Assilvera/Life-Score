import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ActionRepository } from '../../domain/repositories/action.repository';
import { Action } from '../../domain/entities/action.entity';

@Injectable()
export class UpdateActionUseCase {
  constructor(private readonly actionRepository: ActionRepository) {}

  async execute(id: string, updates: Partial<Action>): Promise<Action> {
    const existing = await this.actionRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Action not found');
    }

    // Si se está actualizando el código, verificar que no exista otro con el mismo código
    if (updates.code && updates.code !== existing.code) {
      const codeExists = await this.actionRepository.findByCode(updates.code);
      if (codeExists) {
        throw new BadRequestException('Action with this code already exists');
      }
    }

    // Crear una nueva instancia con los valores actualizados
    const updated = new Action(
      existing.id,
      updates.code ?? existing.code,
      updates.title ?? existing.title,
      updates.category ?? existing.category,
      updates.basePoints ?? existing.basePoints,
      updates.difficulty ?? existing.difficulty,
      updates.description ?? existing.description,
      updates.coinsReward ?? existing.coinsReward,
      updates.isActive ?? existing.isActive,
      existing.createdAt,
      new Date(), // updatedAt siempre se actualiza
    );

    return this.actionRepository.update(updated);
  }
}
