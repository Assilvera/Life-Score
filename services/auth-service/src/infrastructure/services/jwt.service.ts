import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: { sub: string; email: string; username: string }): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}


