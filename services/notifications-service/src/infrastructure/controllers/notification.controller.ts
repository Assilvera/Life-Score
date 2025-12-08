import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '../../application/use-cases/send-notification.usecase';
import { GetNotificationsUseCase } from '../../application/use-cases/get-notifications.usecase';
import { MarkAsReadUseCase } from '../../application/use-cases/mark-as-read.usecase';
import { SendNotificationDto } from '../../application/dto/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotification: SendNotificationUseCase,
    private readonly getNotifications: GetNotificationsUseCase,
    private readonly markAsRead: MarkAsReadUseCase,
  ) {}

  @Post()
  async create(@Body() dto: SendNotificationDto) {
    const notif = await this.sendNotification.execute(dto);
    return notif;
  }

  @Get('user/:userId')
  async byUser(@Param('userId') userId: string) {
    const notifs = await this.getNotifications.execute(userId);
    return notifs;
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    const notif = await this.markAsRead.execute(id);
    return notif;
  }
}
