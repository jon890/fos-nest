import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // console에 찍혀서 별로 보기 안좋음
      // NestLogger를 사용하자
      //logger: true
    }),
  );
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
