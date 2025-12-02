// src/infrastructure/actions-infrastructure.module.ts
import { Module } from '@nestjs/common';
import { ActionsController } from './controllers/action.controller';
import { CreateActionUseCase } from '../application/use-cases/create-action.usecase';
import { GetActionsUseCase } from '../application/use-cases/get-actions.usecase';

import { PrismaService } from './persistence/prisma/prisma.service';
import { ActionPrismaRepository } from './persistence/action.prisma.repository';

@Module({
  controllers: [ActionsController],
  providers: [
    PrismaService,
    {
      provide: 'ActionRepository',
      useClass: ActionPrismaRepository,
    },
    CreateActionUseCase,
    GetActionsUseCase,
  ],
})
export class ActionsInfrastructureModule {}
