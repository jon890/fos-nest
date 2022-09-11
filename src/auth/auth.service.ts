import { Injectable } from '@nestjs/common';
import { User } from './../user/user.model';
import { UserService } from './../user/user.service';

export type Credentials = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
