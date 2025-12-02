import { User } from '../../domain/entities/user.entity';
import { AuthResponseDto } from '../../application/dto/auth-response.dto';

export class AuthMapper {
  static toAuthResponse(user: User, token: string): AuthResponseDto {
    return AuthResponseDto.fromEntity(user, token);
  }
}


