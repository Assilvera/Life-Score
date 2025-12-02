import { NestFactory } from '@nestjs/core';
import { AuthInfrastructureModule } from './infrastructure/auth-infrastructure.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { envConfig } from './infrastructure/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AuthInfrastructureModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Life Score - Auth Service')
    .setDescription('API para autenticación y gestión de usuarios')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('auth', app, document);

  await app.listen(envConfig.port);
  console.log(`🚀 Auth Service running on: http://localhost:${envConfig.port}`);
  console.log(`📚 Swagger available at: http://localhost:${envConfig.port}/auth`);
}
bootstrap();


