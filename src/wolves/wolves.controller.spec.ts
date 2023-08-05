import { TestingModule, Test } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { WolvesController } from './wolves.controller';
import { WolvesService } from './wolves.service';

describe('WolvesController', () => {
  let wolvesController: WolvesController;
  let wolvesService: DeepMocked<WolvesService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [WolvesController],
    })
      .useMocker(createMock)
      .compile();

    wolvesController = moduleRef.get<WolvesController>(WolvesController);
    wolvesService = moduleRef.get<WolvesService, DeepMocked<WolvesService>>(
      WolvesService,
    );
  });
});
