import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sample } from './sample.model';

@Injectable()
export default class SampleService {
  constructor(
    @InjectModel(Sample)
    private sampleModel: typeof Sample,
  ) {}

  async findAll(): Promise<Sample[]> {
    return this.sampleModel.findAll();
  }

  findOne(id: string): Promise<Sample> {
    return this.sampleModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const sample = await this.findOne(id);
    await sample.destroy();
  }
}
