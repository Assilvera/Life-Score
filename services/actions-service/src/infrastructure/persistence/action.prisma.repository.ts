import { Injectable } from '@nestjs/common';
import { ActionRepository } from '../../domain/repositories/action.repository';
import { Action } from '../../domain/entities/action.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class ActionPrismaRepository implements ActionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToEntity(record: any): Action {
    return new Action(
      record.id,
      record.code,
      record.title,
      record.category,
      record.basePoints,
      record.difficulty,
      record.description,
      record.coinsReward,
      record.isActive,
      record.createdAt,
      record.updatedAt,
    );
  }

  async create(action: Action): Promise<Action> {
    const created = await this.prisma.action.create({
      data: {
        code: action.code,
        title: action.title,
        category: action.category,
        basePoints: action.basePoints,
        difficulty: action.difficulty,
        description: action.description,
        coinsReward: action.coinsReward,
        isActive: action.isActive,
      },
    });
    return this.mapToEntity(created);
  }

  async findAll(): Promise<Action[]> {
    const rows = await this.prisma.action.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.mapToEntity(r));
  }

  async findById(id: string): Promise<Action | null> {
    const row = await this.prisma.action.findUnique({ where: { id } });
    return row ? this.mapToEntity(row) : null;
  }

  async findByCode(code: string): Promise<Action | null> {
    const row = await this.prisma.action.findUnique({ where: { code } });
    return row ? this.mapToEntity(row) : null;
  }

  async update(action: Action): Promise<Action> {
    const updated = await this.prisma.action.update({
      where: { id: action.id },
      data: {
        code: action.code,
        title: action.title,
        category: action.category,
        basePoints: action.basePoints,
        difficulty: action.difficulty,
        description: action.description,
        coinsReward: action.coinsReward,
        isActive: action.isActive,
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.action.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
