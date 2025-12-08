import { IsString, IsOptional } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  userId!: string;

  @IsString()
  title!: string;

  @IsString()
  message!: string;

  @IsString()
  type!: string; // "REMINDER", etc.

  @IsOptional()
  @IsString()
  challengeId?: string;
}
