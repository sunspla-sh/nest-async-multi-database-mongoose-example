import { TestingModule, Test } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: DeepMocked<CatsService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker(createMock)
      .compile();
  });
});
