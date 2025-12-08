import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { NotificationsInfrastructureModule } from './infrastructure/notifications-infrastructure.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsInfrastructureModule);

  app.setGlobalPrefix('api');

  // ⭐ Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Notifications Service')
    .setDescription('API Documentation for LifeScore - Notifications Microservice')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('notification', app, document);

  const port = process.env.PORT || 3004;
  await app.listen(port);

  console.log(`🚀 Notifications service listening on port ${port}`);
  console.log(`📘 Swagger available at http://localhost:${port}/api/docs`);
}
bootstrap();
