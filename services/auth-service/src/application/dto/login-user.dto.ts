import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Email o nombre de usuario para iniciar sesión',
  })
  @IsString()
  @IsNotEmpty()
  emailOrUsername!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}


