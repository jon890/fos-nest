import { Injectable } from '@nestjs/common';
import { User } from './../user/user.model';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from './interface/fastify.request-with-user.interface';

export type Credentials = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: Credentials): Promise<User | null> {
    const user = await this.userService.findByEmail(credentials.email);

    if (!user) {
      // user not found
      return null;
    }

    if (user.password !== credentials.password) {
      // password un-matched
      return null;
    }

    return user.toJSON<User>();
  }

  async generateToken(user: LoginUser) {
    const payload = { username: user.email, sub: user.email };
    return this.jwtService.sign(payload);
  }
}
