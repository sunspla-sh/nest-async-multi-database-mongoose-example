import { TestingModule, Test } from '@nestjs/testing';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Connection, Model, Types } from 'mongoose';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION } from '../constants';
import { CreateCatDto } from './create-cat.dto';
import { CreateCatArrayDto } from './create-cat-array.dto';

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
        {
          provide: getConnectionToken(NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION),
          useValue: createMock<Connection>(),
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

    it('should invoke the static find method of cat model', () => {
      catsService.findAll();
      expect(catModel.find).toHaveBeenCalled();
    });

    it('should invoke the exec method returned by calling the static find method of cat model', () => {
      catsService.findAll();
      expect(catModel.find().exec).toHaveBeenCalled();
    });

    it('should return the result of invoking the exec method of the query returned by calling the static find method of cat model', () => {
      expect(catModel.find().exec).toHaveReturnedWith(catsService.findAll());
    });
  });

  describe('findById', () => {
    it('should be a method', () => {
      expect(catsService.findById).toEqual(expect.any(Function));
    });

    it('should invoke the static findById method of cat model with a string argument', () => {
      const id = new Types.ObjectId().toString();
      catsService.findById(id);
      expect(catModel.findById).toHaveBeenCalledWith(id);
    });

    it('should invoke the exec method of the query returned by calling the static findById method of cat model with a string argument', () => {
      const id = new Types.ObjectId().toString();
      catsService.findById(id);
      expect(catModel.findById(id).exec).toHaveBeenCalled();
    });

    it('should return the result of invoking the exec method of the query returned by calling static findById method of cat model with a string argument', () => {
      const id = new Types.ObjectId().toString();
      expect(catModel.findById(id).exec).toHaveReturnedWith(
        catsService.findById(id),
      );
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(catsService.create).toEqual(expect.any(Function));
    });
    it('should invoke the static create method of cat model with a CreateCatDto argument', () => {
      const createCatDto = new CreateCatDto();
      catsService.create(createCatDto);
      expect(catModel.create).toHaveBeenCalled();
    });

    it('should return the result of invoking the static create method of cat model with a CreateCatDto argument', () => {
      const createCatDto = new CreateCatDto();
      expect(catModel.create).toHaveReturnedWith(
        catsService.create(createCatDto),
      );
    });
  });

  describe('createMultiple', () => {
    it('should be a method', () => {
      expect(catsService.createMultiple).toEqual(expect.any(Function));
    });

    it('should invoke the static create method of cat model with a CreateCatArrayDto argument', () => {
      const createCatArrayDto = new CreateCatArrayDto();
      catsService.createMultiple(createCatArrayDto);
      expect(catModel.create).toHaveBeenCalled();
    });

    it('should return the result of invoking the static create method of cat model with a CreateCatArrayDto argument', () => {
      const createCatArrayDto = new CreateCatArrayDto();
      expect(catModel.create).toHaveReturnedWith(
        catsService.createMultiple(createCatArrayDto),
      );
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(catsService.remove).toEqual(expect.any(Function));
    });

    it('should invoke the static findByIdAndDelete method of cat model with a string argument', () => {
      const id = new Types.ObjectId().toString();
      catsService.remove(id);
      expect(catModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });

    it('should invoke the exec method of the query returned by calling the static findByIdAndDelete method of cat model with a string argument', () => {
      const id = new Types.ObjectId().toString();
      catsService.remove(id);
      expect(catModel.findByIdAndDelete(id).exec).toHaveBeenCalled();
    });

    it('should return the result of invoking the exec method of the query returned by calling the static findByIdAndDelete method of cat model with a string argument', () => {
      const id = new Types.ObjectId().toString();
      expect(catModel.findByIdAndDelete(id).exec).toHaveReturnedWith(
        catsService.remove(id),
      );
    });
  });
});
