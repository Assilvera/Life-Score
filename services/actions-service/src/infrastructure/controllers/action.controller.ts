import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateActionUseCase } from '../../application/use-cases/create-action.usecase';
import { GetActionsUseCase } from '../../application/use-cases/get-actions.usecase';
import { CreateActionDto } from '../../application/dto/create-action.dto';
import { ActionDto } from '../../application/dto/action.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
  @ApiBody({
    type: CreateActionDto,
    examples: {
      example1: {
        summary: 'Acción de ejercicio',
        value: {
          code: 'EXERCISE_30MIN',
          title: 'Ejercitarse 30 minutos',
          category: 'Salud',
          basePoints: 50,
          difficulty: 'medium',
          description: 'Realizar ejercicio físico durante 30 minutos consecutivos',
          coinsReward: 10,
        },
      },
      example2: {
        summary: 'Acción de lectura',
        value: {
          code: 'READ_BOOK',
          title: 'Leer un libro',
          category: 'Educación',
          basePoints: 30,
          difficulty: 'easy',
          description: 'Leer al menos 20 páginas de un libro',
          coinsReward: 5,
        },
      },
      example3: {
        summary: 'Acción sin recompensa en monedas',
        value: {
          code: 'MEDITATE_10MIN',
          title: 'Meditar 10 minutos',
          category: 'Bienestar',
          basePoints: 25,
          difficulty: 'easy',
          description: 'Realizar una sesión de meditación de al menos 10 minutos',
        },
      },
    },
  })
  @ApiResponse({ status: 201, type: ActionDto })
  @ApiResponse({ status: 400, description: 'Código de acción ya existe' })
  async create(@Body() dto: CreateActionDto): Promise<ActionDto> {
    const action = await this.createActionUseCase.execute(dto);
    return ActionDto.fromEntity(action);
  }
}

