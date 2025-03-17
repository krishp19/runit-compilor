import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    console.log('Initializing JWT Strategy:', { 
      secretAvailable: !!secret,
      secretPrefix: secret?.slice(0, 5) + '...'
    });

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    try {
      console.log('Validating JWT payload:', { 
        hasPayload: !!payload,
        payloadKeys: payload ? Object.keys(payload) : [],
        email: payload?.email,
        sub: payload?.sub
      });

      if (!payload) {
        throw new UnauthorizedException('Invalid token payload');
      }

      if (!payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid token structure');
      }

      return { userId: payload.sub, email: payload.email };
    } catch (error) {
      console.error('JWT validation error:', error);
      throw new UnauthorizedException('Token validation failed');
    }
  }
}