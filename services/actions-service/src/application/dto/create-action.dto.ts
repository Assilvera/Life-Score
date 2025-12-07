import { IsInt, IsNotEmpty, IsOptional, IsString, IsIn, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActionDto {
  @ApiProperty({
    example: 'EXERCISE_30MIN',
    description: 'Código único de la acción',
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({
    example: 'Ejercitarse 30 minutos',
    description: 'Título de la acción',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Salud',
    description: 'Categoría de la acción',
  })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({
    example: 50,
    description: 'Puntos base que otorga la acción',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  basePoints!: number;

  @ApiProperty({
    example: 'medium',
    description: 'Dificultad de la acción',
    enum: ['easy', 'medium', 'hard'],
  })
  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty!: 'easy' | 'medium' | 'hard';

  @ApiProperty({
    example: 'Realizar ejercicio físico durante 30 minutos consecutivos',
    description: 'Descripción detallada de la acción',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 10,
    description: 'Monedas de recompensa (opcional)',
    minimum: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  coinsReward?: number;
}
