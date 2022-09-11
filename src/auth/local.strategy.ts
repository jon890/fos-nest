import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * 이메일, 비밀번호를 받아서
   * 사용자를 검증한다.
   * 그리고 해당사용자를 Request 객체에 붙인다
   *
   * TODO: 암호화된 패스워드를 비교해야한다.
   *
   * @param email
   * @param password
   * @returns
   */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
