import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ActionsInfrastructureModule } from './infrastructure/actions-infrastructure.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ActionsInfrastructureModule);

  // Prefijo global para todos los controladores
  app.setGlobalPrefix('api');

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Life Score - Actions Service')
    .setDescription('API para gestionar el catálogo de acciones de la vida.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // 🔥 Swagger ahora en /api/docs
  SwaggerModule.setup('api/docs', app, document);

  const port = 3001;
  await app.listen(port);
  console.log(`🚀 Actions service corriendo en http://localhost:${port}`);
  console.log(`📘 Swagger en http://localhost:${port}/api/docs`);
}
bootstrap();
