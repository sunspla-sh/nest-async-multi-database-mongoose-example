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

    catsController = moduleRef.get<CatsController>(CatsController);
    catsService = moduleRef.get<CatsService, DeepMocked<CatsService>>(
      CatsService,
    );
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  it('should be instance of CatsController', () => {
    expect(catsController).toBeInstanceOf(CatsController);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(catsController.findAll).toEqual(expect.any(Function));
    });

    it('should invoke findAll method of an instance of CatsService', () => {
      catsController.findAll();
      expect(catsService.findAll).toHaveBeenCalled();
    })
  });

  describe('findById', () => {
    it('should be a method', () => {
      expect(catsController.findById).toEqual(expect.any(Function));
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(catsController.create).toEqual(expect.any(Function));
    });
  });

  describe('createMultiple', () => {
    it('should be a method', () => {
      expect(catsController.createMultiple).toEqual(expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(catsController.remove).toEqual(expect.any(Function));
    });
  });
});
