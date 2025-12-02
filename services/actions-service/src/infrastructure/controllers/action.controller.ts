import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateActionUseCase } from '../../application/use-cases/create-action.usecase';
import { GetActionsUseCase } from '../../application/use-cases/get-actions.usecase';
import { CreateActionDto } from '../../application/dto/create-action.dto';
import { ActionDto } from '../../application/dto/action.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(
    private readonly createActionUseCase: CreateActionUseCase,
    private readonly getActionsUseCase: GetActionsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar acciones disponibles' })
  @ApiResponse({ status: 200, type: [ActionDto] })
  async getAll(): Promise<ActionDto[]> {
    const actions = await this.getActionsUseCase.execute();
    return actions.map(ActionDto.fromEntity);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva acción' })
  @ApiResponse({ status: 201, type: ActionDto })
  async create(@Body() dto: CreateActionDto): Promise<ActionDto> {
    const action = await this.createActionUseCase.execute(dto);
    return ActionDto.fromEntity(action);
  }
}

