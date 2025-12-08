import { Notification } from '../entities/notification.entity';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract findByUser(userId: string): Promise<Notification[]>;
  abstract markAsRead(id: string): Promise<Notification | null>;
}
