import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import { PasswordHashService } from '../../domain/services/password-hash.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: RegisterUserDto): Promise<User> {
    // Verificar si el email ya existe
    const existingEmail = await this.userRepository.findByEmail(input.email);
    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }

    // Verificar si el username ya existe
    const existingUsername = await this.userRepository.findByUsername(input.username);
    if (existingUsername) {
      throw new BadRequestException('Username already taken');
    }

    // Hashear la contraseña
    const hashedPassword = await PasswordHashService.hash(input.password);

    // Crear el usuario
    const user = User.create({
      email: input.email,
      username: input.username,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    return this.userRepository.create(user);
  }
}


