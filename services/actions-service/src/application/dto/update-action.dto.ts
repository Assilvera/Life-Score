import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  Min,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateActionDto {
  @ApiPropertyOptional({ example: 'EXERCISE_45MIN' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: 'Ejercitarse 45 minutos' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Salud' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 70, minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  basePoints?: number;

  @ApiPropertyOptional({
    example: 'hard',
    enum: ['easy', 'medium', 'hard'],
  })
  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  @IsOptional()
  difficulty?: 'easy' | 'medium' | 'hard';

  @ApiPropertyOptional({
    example: 'Ejercicio intenso durante 45 minutos',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 15, minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  coinsReward?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
