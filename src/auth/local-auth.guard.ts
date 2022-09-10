import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Passport Local Strategy 전략을 수행하여
 * 라우트들을 Guard 하는 역할을 수행한다.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
