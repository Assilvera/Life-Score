import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { Notification } from '../../domain/entities/notification.entity';
import { randomUUID } from 'crypto';  // 👈 No requiere dependencias externas

@Injectable()
export class SendNotificationUseCase {
  constructor(private readonly repo: NotificationRepository) {}

  async execute(dto: SendNotificationDto): Promise<Notification> {
    const notification = new Notification(
      randomUUID(),                // id
      dto.userId,                  // userId
      dto.title,                   // title
      dto.message,                 // message
      dto.type,                    // type
      dto.challengeId ?? null,     // challengeId
      false,                       // isRead
      new Date(),                  // createdAt
      null                         // readAt
    );

    return this.repo.create(notification);
  }
}
