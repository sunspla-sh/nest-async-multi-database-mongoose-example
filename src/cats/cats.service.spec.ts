import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Model } from 'mongoose';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';

describe('CatsService', () => {
  let catsService: CatsService;
  let catModel: DeepMocked<Model<Cat>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(
            Cat.name,
            NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
          ),
          useValue: createMock<Model<Cat>>(),
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catModel = moduleRef.get<Model<Cat>, DeepMocked<Model<Cat>>>(
      getModelToken(Cat.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION),
    );
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  it('should be instance of CatsService', () => {
    expect(catsService).toBeInstanceOf(CatsService);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(catsService.findAll).toEqual(expect.any(Function));
    });
  });

  describe('findById', () => {
    it('should be a method', () => {
      expect(catsService.findById).toEqual(expect.any(Function));
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(catsService.create).toEqual(expect.any(Function));
    });
  });

  describe('createMultiple', () => {
    it('should be a method', () => {
      expect(catsService.createMultiple).toEqual(expect.any(Function));
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(catsService.remove).toEqual(expect.any(Function));
    });
  });
});
