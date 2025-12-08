import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateActionUseCase } from '../../application/use-cases/create-action.usecase';
import { GetActionsUseCase } from '../../application/use-cases/get-actions.usecase';
import { UpdateActionUseCase } from '../../application/use-cases/update-action.usecase';
import { DeleteActionUseCase } from '../../application/use-cases/delete-action.usecase';
import { GetActionByNameUseCase } from '../../application/use-cases/get-action-by-name.usecase';

import { CreateActionDto } from '../../application/dto/create-action.dto';
import { UpdateActionDto } from '../../application/dto/update-action.dto';
import { ActionDto } from '../../application/dto/action.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
  constructor(
    private readonly createActionUseCase: CreateActionUseCase,
    private readonly getActionsUseCase: GetActionsUseCase,
    private readonly updateActionUseCase: UpdateActionUseCase,
    private readonly deleteActionUseCase: DeleteActionUseCase,
    private readonly getActionByNameUseCase: GetActionByNameUseCase, // 👈 AHORA SÍ
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar acciones disponibles' })
  @ApiResponse({ status: 200, type: [ActionDto] })
  async getAll(): Promise<ActionDto[]> {
    const actions = await this.getActionsUseCase.execute();
    return actions.map(ActionDto.fromEntity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una acción por id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: ActionDto })
  async getById(@Param('id') id: string): Promise<ActionDto> {
    const actions = await this.getActionsUseCase.execute();
    const action = actions.find((a) => a.id === id);

    if (!action) {
      throw new NotFoundException('Action not found');
    }

    return ActionDto.fromEntity(action);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva acción' })
  @ApiBody({ type: CreateActionDto })
  @ApiResponse({ status: 201, type: ActionDto })
  async create(@Body() dto: CreateActionDto): Promise<ActionDto> {
    const action = await this.createActionUseCase.execute(dto);
    return ActionDto.fromEntity(action);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una acción existente' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateActionDto,
  ): Promise<ActionDto> {
    const updated = await this.updateActionUseCase.execute(id, dto as any);
    return ActionDto.fromEntity(updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una acción (soft delete)' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteActionUseCase.execute(id);
  }

  // 👉 Nuevo endpoint funcionando
  @Get('/by-name/:name')
  @ApiOperation({ summary: 'Buscar acción por nombre' })
  @ApiParam({ name: 'name', required: true })
  async getByName(@Param('name') name: string) {
    const action = await this.getActionByNameUseCase.execute(name);

    if (!action) {
      throw new NotFoundException(`Action with name "${name}" not found`);
    }

    return ActionDto.fromEntity(action);
  }
}
