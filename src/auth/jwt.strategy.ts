import { plainToInstance } from 'class-transformer';
import { JWTPayload, User } from '@auth/auth.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET'),
    });
  }

  validate(payload: JWTPayload) {
    const { sub: id, ...rest } = payload;
    const userPayload = { id, ...rest };
    return plainToInstance(User, userPayload);
  }
}
