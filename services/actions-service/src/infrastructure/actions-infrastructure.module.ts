import { Module } from '@nestjs/common';
import { ActionsController } from './controllers/actions.controller';
import { PrismaService } from './prisma/prisma.service';
import { ActionPrismaRepository } from './persistence/action.prisma.repository';
import { CreateActionUseCase } from '../application/use-cases/create-action.usecase';
import { GetActionsUseCase } from '../application/use-cases/get-actions.usecase';
import { ActionRepository } from '../domain/repositories/action.repository';

@Module({
  controllers: [ActionsController],
  providers: [
    PrismaService,
    {
      provide: ActionRepository,
      useClass: ActionPrismaRepository,
    } as any, // si prefieres, cambia a useValue/useFactory o usa un token tipo 'ActionRepository'
    CreateActionUseCase,
    GetActionsUseCase,
  ],
})
export class ActionsInfrastructureModule {}
