import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../../application/use-cases/login-user.usecase';
import { ValidateTokenUseCase } from '../../application/use-cases/validate-token.usecase';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import { LoginUserDto } from '../../application/dto/login-user.dto';
import { AuthResponseDto } from '../../application/dto/auth-response.dto';
import { JwtAuthService } from '../services/jwt.service';
import { AuthMapper } from '../mappers/auth.mapper';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Email o username ya registrado' })
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponseDto> {
    const user = await this.registerUserUseCase.execute(dto);
    const token = this.jwtAuthService.generateToken({
      sub: user.id,
      email: user.email,
      username: user.username,
    });
    return AuthMapper.toAuthResponse(user, token);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.loginUserUseCase.execute(dto);
    const token = this.jwtAuthService.generateToken({
      sub: user.id,
      email: user.email,
      username: user.username,
    });
    return AuthMapper.toAuthResponse(user, token);
  }

  @Get('me')
  @ApiOperation({ summary: 'Validar token y obtener información del usuario' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  async me(@Request() req: any): Promise<AuthResponseDto> {
    // Por ahora, este endpoint requiere que se pase el userId en los headers
    // En producción, deberías usar un JWT Guard
    const userId = req.headers['x-user-id'];
    if (!userId) {
      throw new Error('User ID not found in headers. Send x-user-id header.');
    }
    const user = await this.validateTokenUseCase.execute(userId);
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    return AuthMapper.toAuthResponse(user, token);
  }
}

