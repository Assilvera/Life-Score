import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { PasswordHashService } from '../../domain/services/password-hash.service';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: LoginUserDto): Promise<User> {
    // Buscar usuario por email o username
    let user = await this.userRepository.findByEmail(input.emailOrUsername);
    if (!user) {
      user = await this.userRepository.findByUsername(input.emailOrUsername);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Verificar contraseña
    const isPasswordValid = await PasswordHashService.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}


