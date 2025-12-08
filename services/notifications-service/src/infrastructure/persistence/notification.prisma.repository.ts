import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class NotificationPrismaRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<Notification> {
    const created = await this.prisma.notification.create({
      data: {
        id: notification.id,
        userId: notification.userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        challengeId: notification.challengeId,
        isRead: notification.isRead,
        createdAt: notification.createdAt ?? new Date(),
        readAt: notification.readAt ?? null,
      },
    });
    return this.mapToEntity(created);
  }

  async findByUser(userId: string): Promise<Notification[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapToEntity(r));
  }

  async markAsRead(id: string): Promise<Notification | null> {
    const updated = await this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
    return this.mapToEntity(updated);
  }

  private mapToEntity(row: any): Notification {
    return new Notification(
      row.id,
      row.userId,
      row.title,
      row.message,
      row.type,
      row.challengeId,
      row.isRead,
      row.createdAt,
      row.readAt,
    );
  }
}
