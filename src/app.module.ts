import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleController } from './sample/sample.controller';
import SampleService from './sample/sample.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bifos',
      password: 'bifos',
      database: 'bifos_db',
      models: [],
    }),
  ],
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService],
})
export class AppModule {}
