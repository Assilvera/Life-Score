import { Action } from '../../domain/entities/action.entity';
import { ActionDto } from '../../application/dto/action.dto';

export class ActionMapper {
  static toDto(action: Action): ActionDto {
    return ActionDto.fromEntity(action);
  }

  static toDtoList(actions: Action[]): ActionDto[] {
    return actions.map((action) => ActionDto.fromEntity(action));
  }
}
