import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToEntity(record: any): User {
    return new User(
      record.id,
      record.email,
      record.username,
      record.password,
      record.firstName,
      record.lastName,
      record.isActive,
      record.createdAt,
      record.updatedAt,
    );
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
      },
    });
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.mapToEntity(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? this.mapToEntity(row) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { username } });
    return row ? this.mapToEntity(row) : null;
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
      },
    });
    return this.mapToEntity(updated);
  }
}


