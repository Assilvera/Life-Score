import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';

@Injectable()
export class GetNotificationsUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(userId: string): Promise<Notification[]> {
    return this.repo.findByUser(userId);
  }
}
