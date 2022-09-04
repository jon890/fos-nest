import { Injectable } from '@nestjs/common';

@Injectable()
export default class SampleService {
  data: string[] = [];

  findAll() {
    return this.data;
  }
}
