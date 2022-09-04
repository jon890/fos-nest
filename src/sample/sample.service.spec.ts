import { Test } from '@nestjs/testing';
import SampleService from './sample.service';

describe('SampleService', () => {
  let service: SampleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SampleService],
    }).compile();

    service = moduleRef.get<SampleService>(SampleService);
  });

  describe('findAll', () => {
    it('샘플 배열을 반환한다', async () => {
      const result = ['sample'];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(service.findAll()).toBe(result);
    });
  });
});
