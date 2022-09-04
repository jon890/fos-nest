import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SampleController } from './sample.controller';
import { Sample } from './sample.model';
import SampleService from './sample.service';

@Module({
  imports: [SequelizeModule.forFeature([Sample])],
  providers: [SampleService],
  controllers: [SampleController],
  exports: [SequelizeModule],
})
export class SampleModule {}
