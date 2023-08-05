import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Model, Types } from 'mongoose';
import { WolvesService } from './wolves.service';
import { Wolf } from './schemas/wolf.schema';
import { NEST_MULTIDB_WOLVES_CONNECTION } from '../constants';
import { CreateWolfDto } from './create-wolf.dto';

describe('WolvesService', () => {
  let wolvesService: WolvesService;
  let wolfModel: DeepMocked<Model<Wolf>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        WolvesService,
        {
          provide: getModelToken(Wolf.name, NEST_MULTIDB_WOLVES_CONNECTION),
          useValue: createMock<Model<Wolf>>(),
        },
      ],
    }).compile();

    wolvesService = moduleRef.get<WolvesService>(WolvesService);
    wolfModel = moduleRef.get<Model<Wolf>, DeepMocked<Model<Wolf>>>(
      getModelToken(Wolf.name, NEST_MULTIDB_WOLVES_CONNECTION),
    );
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(wolvesService.findAll).toEqual(expect.any(Function));
    });

    it('should invoke the static find method of wolf model', () => {
      wolvesService.findAll();
      expect(wolfModel.find).toHaveBeenCalled();
    });

    it('should invoke the query returned by calling the static find method of wolf model', () => {
      wolvesService.findAll();
      expect(wolfModel.find().exec).toHaveBeenCalled();
    });

    it('should return the result of invoking the query returned by calling the static find method of wolf model', () => {
      expect(wolfModel.find().exec).toHaveReturnedWith(wolvesService.findAll());
    });
  });

  describe('findById', () => {
    it('should be a method', () => {
      expect(wolvesService.findById).toEqual(expect.any(Function));
    });

    it('should invoke the static findById method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      wolvesService.findById(id);
      expect(wolfModel.findById).toHaveBeenCalledWith(id);
    });
    it('should invoke the query returned by calling the static find method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      wolvesService.findById(id);
      expect(wolfModel.findById(id).exec).toHaveBeenCalled();
    });

    it('should return the result of invoking the query returned by calling the static find method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      expect(wolfModel.findById(id).exec).toHaveReturnedWith(
        wolvesService.findById(id),
      );
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(wolvesService.create).toEqual(expect.any(Function));
    });

    it('should invoke the static create method of wolf model', () => {
      const createWolfDto = new CreateWolfDto();
      wolvesService.create(createWolfDto);
      expect(wolfModel.create).toHaveBeenCalledWith(createWolfDto);
    });
    it('should return the result of invoking the static create method of wolf model', () => {
      const createWolfDto = new CreateWolfDto();
      expect(wolfModel.create).toHaveReturnedWith(
        wolvesService.create(createWolfDto),
      );
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(wolvesService.remove).toEqual(expect.any(Function));
    });
    it('should invoke the static findByIdAndDelete method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      wolvesService.remove(id);
      expect(wolfModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });

    it('should invoke the query returned by calling the static findByIdAndDelete method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      wolvesService.remove(id);
      expect(wolfModel.findByIdAndDelete(id).exec).toHaveBeenCalled();
    });

    it('should return the result of invoking the query returned by calling the static findByIdAndDelete method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      expect(wolfModel.findByIdAndDelete(id).exec).toHaveReturnedWith(
        wolvesService.remove(id),
      );
    });
  });
});
