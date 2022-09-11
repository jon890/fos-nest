import {
  Controller,
  HttpCode,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyRequestWithUser } from './interface/fastify.request-with-user.interface';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Request() req: FastifyRequestWithUser): Promise<String> {
    return this.authService.generateToken(req.user);
  }
}
