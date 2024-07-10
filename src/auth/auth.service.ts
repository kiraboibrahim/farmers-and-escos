import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Esco } from '@esco/entities/esco.entity';
import { JWTPayload } from '@auth/auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user =
      (await Farmer.findByUsername(username)) ||
      (await Esco.findByUsername(username));
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isValidPassword = user.hasPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  async signin(user: Farmer | Esco) {
    const accessToken = await this.getAccessToken(user);
    return {
      accessToken,
    };
  }

  private async getAccessToken(user: any) {
    const payload: JWTPayload = {
      sub: user.id,
      role: user.role,
      phoneNumber: user.phoneNumber,
      firstName: user?.firstName,
      lastName: user?.lastName,
      escoName: user?.name,
    };
    return await this.jwtService.signAsync(payload);
  }
}
