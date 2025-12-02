import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { ValidateTokenUseCase } from '../application/use-cases/validate-token.usecase';
import { PrismaService } from './persistence/prisma/prisma.service';
import { UserPrismaRepository } from './persistence/user.prisma.repository';
import { JwtAuthService } from './services/jwt.service';
import { envConfig } from './config/env.config';

@Module({
  imports: [
    JwtModule.register({
      secret: envConfig.jwtSecret,
      signOptions: { expiresIn: envConfig.jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    JwtAuthService,
    RegisterUserUseCase,
    LoginUserUseCase,
    ValidateTokenUseCase,
  ],
})
export class AuthInfrastructureModule {}


