import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Jwt 전략을 사용하여
 * 라우트를 보호한다.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
