import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConst } from './constants/auth.const';
import { LoginUser } from './interface/fastify.request-with-user.interface';

export type DecodedJWT = {
  sub: string; // email
  username: string; // email
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConst.jwt.secert,
    });
  }

  /**
   * 해독된 JWT를 받아서 검증한다
   * 그리고 Request 객체에 붙인다.
   * @param payload
   * @returns
   */
  validate(payload: DecodedJWT): LoginUser {
    return { email: payload.sub, nickname: payload.sub };
  }
}
