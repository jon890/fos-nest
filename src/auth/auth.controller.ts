import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import {
  FastifyRequestWithUser,
  LoginUser,
} from './interface/fastify.request-with-user.interface';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Request() req: FastifyRequestWithUser): Promise<LoginUser> {
    const {
      user: { email, nickname },
    } = req;

    return { email, nickname };
  }
}
