import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ActionRepository } from '../../domain/repositories/action.repository';

@Injectable()
export class DeleteActionUseCase {
  constructor(
    @Inject('ActionRepository')
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.actionRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Action not found');
    }

    // Repo ya hace soft delete poniendo isActive = false :contentReference[oaicite:4]{index=4}
    await this.actionRepository.delete(id);
  }
}
