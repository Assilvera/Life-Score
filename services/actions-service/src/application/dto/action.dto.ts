import { ApiProperty } from '@nestjs/swagger';
import { Action } from '../../domain/entities/action.entity';

export class ActionDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  basePoints!: number;

  @ApiProperty({ enum: ['easy', 'medium', 'hard'] })
  difficulty!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ required: false })
  coinsReward?: number;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromEntity(action: Action): ActionDto {
    const dto = new ActionDto();
    dto.id = action.id;
    dto.code = action.code;
    dto.title = action.title;
    dto.category = action.category;
    dto.basePoints = action.basePoints;
    dto.difficulty = action.difficulty;
    dto.description = action.description;
    dto.coinsReward = action.coinsReward;
    dto.isActive = action.isActive;
    dto.createdAt = action.createdAt;
    dto.updatedAt = action.updatedAt;
    return dto;
  }
}
