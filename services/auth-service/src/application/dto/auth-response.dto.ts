export class AuthResponseDto {
  accessToken!: string;
  user!: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };

  static fromEntity(user: any, token: string): AuthResponseDto {
    const dto = new AuthResponseDto();
    dto.accessToken = token;
    dto.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return dto;
  }
}


