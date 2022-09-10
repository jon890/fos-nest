import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import { AuthModule } from './../src/auth/auth.module';
import { User } from './../src/user/user.model';

const mockUser = {
  email: 'jon89071@gmail.com',
  password: '1234',
  nickname: 'TEST',
};

describe('Auth', () => {
  let app: NestFastifyApplication;

  let userRepository = {
    create: jest.fn().mockResolvedValue(mockUser),
    findByEmail: jest.fn(
      (email) =>
        new User({
          ...mockUser,
          email,
          id: BigInt(1),
          createdAt: new Date(),
          deletedAt: new Date(),
          updatedAt: new Date(),
        }),
    ),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'fos_test',
          password: 'fos_test',
          database: 'fos_test_db',
          autoLoadModels: true,
          synchronize: true,
          sync: {
            force: true,
          },
        }),
        SequelizeModule.forFeature([User]),
      ],
    })
      .overrideProvider(getModelToken(User))
      .useValue(userRepository)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/POST auth/login => 로그인한 유저 정보가 반환된다.', () => {
    const expectedData = { ...mockUser };
    delete expectedData.password;

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: mockUser.email,
          password: mockUser.password,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toEqual(expectedData);
      });
  });
});
