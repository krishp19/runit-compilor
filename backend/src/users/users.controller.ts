import { Controller, Get, UseGuards, Request, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Document } from 'mongoose';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      const user = await this.usersService.findByEmail(req.user.email);
      if (!user) {
        return { message: 'User not found' };
      }
      
      // Remove password from response
      const { password, ...result } = user instanceof Document 
        ? user.toObject() 
        : JSON.parse(JSON.stringify(user));
      
      return result;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new InternalServerErrorException('Error fetching user profile');
    }
  }
}
