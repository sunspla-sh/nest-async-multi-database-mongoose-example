import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Model, Types } from 'mongoose';
import { WolvesService } from './wolves.service';
import { Wolf } from './schemas/wolf.schema';
import {
  NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
  NEST_MULTIDB_WOLVES_CONNECTION,
} from '../constants';
import { CreateWolfDto } from './create-wolf.dto';
import { Owner } from '../owners/schemas/owner.schema';

describe('WolvesService', () => {
  let wolvesService: WolvesService;
  let wolfModel: DeepMocked<Model<Wolf>>;
  let ownerModel: DeepMocked<Model<Owner>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        WolvesService,
        {
          provide: getModelToken(Wolf.name, NEST_MULTIDB_WOLVES_CONNECTION),
          useValue: createMock<Model<Wolf>>(),
        },
        {
          provide: getModelToken(
            Owner.name,
            NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION,
          ),
          useValue: createMock<Model<Owner>>(),
        },
      ],
    }).compile();

    wolvesService = moduleRef.get<WolvesService>(WolvesService);
    wolfModel = moduleRef.get<Model<Wolf>, DeepMocked<Model<Wolf>>>(
      getModelToken(Wolf.name, NEST_MULTIDB_WOLVES_CONNECTION),
    );
    ownerModel = moduleRef.get<Model<Owner>, DeepMocked<Model<Owner>>>(
      getModelToken(Owner.name, NEST_MULTIDB_OWNERS_AND_CATS_CONNECTION),
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
    it('should invoke the populate method on the query returned by calling the static find method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      wolvesService.findById(id);
      expect(wolfModel.findById(id).populate).toHaveBeenCalledWith({
        path: 'owner',
        model: ownerModel,
      });
    });

    it('should invoke the exec method on the query returned by invoking the populate method on the query returned by calling the static find method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      wolvesService.findById(id);
      expect(
        wolfModel.findById(id).populate({ path: 'owner', model: ownerModel })
          .exec,
      ).toHaveBeenCalled();
    });
    it('should return the result of invoking the exec method on the query returned by invoking the populate method on the query returned by calling the static find method of wolf model', () => {
      const id = new Types.ObjectId().toString();
      expect(
        wolfModel.findById(id).populate({ path: 'owner', model: ownerModel })
          .exec,
      ).toHaveReturnedWith(wolvesService.findById(id));
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
