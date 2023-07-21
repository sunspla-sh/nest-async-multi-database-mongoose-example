import { TestingModule, Test } from '@nestjs/testing';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('OwnersController', () => {
  let ownersController: OwnersController;
  let ownersService: DeepMocked<OwnersService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
    })
      .useMocker(createMock)
      .compile();

    ownersController = moduleRef.get<OwnersController>(OwnersController);
    ownersService = moduleRef.get<OwnersService, DeepMocked<OwnersService>>(
      OwnersService,
    );
  });

  it('should be defined', () => {
    expect(ownersController).toBeDefined();
  });

  it('should be instance of OwnersController', () => {
    expect(ownersController).toBeInstanceOf(OwnersController);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(ownersService.findAll).toEqual(expect.any(Function));
    });
  });

  describe('findById', () => {
    it('should be a method', () => {
      expect(ownersService.findById).toEqual(expect.any(Function));
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(ownersService.create).toEqual(expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(ownersService.remove).toEqual(expect.any(Function));
    });
  });
});
