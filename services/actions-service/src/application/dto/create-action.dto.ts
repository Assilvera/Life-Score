import { IsInt, IsNotEmpty, IsOptional, IsString, IsIn, Min } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsInt()
  @Min(0)
  basePoints!: number;

  @IsString()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty!: 'easy' | 'medium' | 'hard';

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  coinsReward?: number;
}
