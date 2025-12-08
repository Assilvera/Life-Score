// src/application/dto/notification.dto.ts
export class NotificationDto {
  id!: string;
  userId!: string;
  title!: string;
  message!: string;
  type!: string;
  challengeId?: string | null;
  isRead!: boolean;
  createdAt!: Date;
  readAt?: Date | null;
}
