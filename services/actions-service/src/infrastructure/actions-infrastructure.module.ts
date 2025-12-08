import { Module } from '@nestjs/common';
import { ActionsController } from './controllers/action.controller';

import { CreateActionUseCase } from '../application/use-cases/create-action.usecase';
import { GetActionsUseCase } from '../application/use-cases/get-actions.usecase';
import { UpdateActionUseCase } from '../application/use-cases/update-action.usecase';
import { DeleteActionUseCase } from '../application/use-cases/delete-action.usecase';
import { GetActionByNameUseCase } from '../application/use-cases/get-action-by-name.usecase'; // 👈 NUEVO

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
    UpdateActionUseCase,
    DeleteActionUseCase,
    GetActionByNameUseCase, // 👈 NUEVO
  ],
})
export class ActionsInfrastructureModule {}
