import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { Credentials, AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.model';
import * as request from 'supertest';

describe('Auth', () => {
  let app: NestFastifyApplication;

  let authService = {
    validateUser: (credentials: Credentials) => {
      return new User({
        email: credentials.email,
        password: credentials.password,
        createdAt: new Date(),
        deletedAt: new Date(),
        id: BigInt(1),
        nickname: 'TEST',
        updatedAt: new Date(),
      });
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/POST auth/login', () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual();
      });
  });
});
