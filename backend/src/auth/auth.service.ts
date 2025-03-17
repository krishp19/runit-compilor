import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return null;
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Use spread operator directly on user if toObject() is not available
        const { password, ...result } = user instanceof Document 
          ? user.toObject() 
          : JSON.parse(JSON.stringify(user));
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new InternalServerErrorException('Error validating user credentials');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Login error:', error);
      throw new InternalServerErrorException('Error during login process');
    }
  }

  async signup(email: string, password: string) {
    try {
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new UnauthorizedException('Email already exists');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userService.create({ email, password: hashedPassword });
      
      // Use spread operator directly on user if toObject() is not available
      const { password: _, ...result } = user instanceof Document 
        ? user.toObject() 
        : JSON.parse(JSON.stringify(user));
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Signup error:', error);
      throw new InternalServerErrorException('Error during signup process');
    }
  }
}