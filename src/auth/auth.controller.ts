import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: FastifyRequest) {
    return req.user;
  }
}
