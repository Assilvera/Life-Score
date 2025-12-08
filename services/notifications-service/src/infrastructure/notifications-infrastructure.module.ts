import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '../application/use-cases/send-notification.usecase';
import { GetNotificationsUseCase } from '../application/use-cases/get-notifications.usecase';
import { MarkAsReadUseCase } from '../application/use-cases/mark-as-read.usecase';
import { NotificationRepository } from '../domain/repositories/notification.repository';
import { NotificationPrismaRepository } from './persistence/notification.prisma.repository';
import { PrismaService } from './persistence/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
  ],
  controllers: [NotificationController],
  providers: [
    PrismaService,
    SendNotificationUseCase,
    GetNotificationsUseCase,
    MarkAsReadUseCase,
    {
      provide: NotificationRepository,
      useClass: NotificationPrismaRepository,
    },
  ],
})
export class NotificationsInfrastructureModule {}
