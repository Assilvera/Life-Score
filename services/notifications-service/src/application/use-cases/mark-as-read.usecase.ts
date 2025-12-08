import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';

@Injectable()
export class MarkAsReadUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(id: string): Promise<Notification | null> {
    return this.repo.markAsRead(id);
  }
}
