import { TestingModule, Test } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Types } from 'mongoose';
import { WolvesController } from './wolves.controller';
import { WolvesService } from './wolves.service';
import { CreateWolfDto } from './create-wolf.dto';

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

  it('should be defined', () => {
    expect(wolvesController).toBeDefined();
  });

  it('should be instance of WolvesController', () => {
    expect(wolvesController).toBeInstanceOf(WolvesController);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(wolvesController.findAll).toEqual(expect.any(Function));
    });

    it('should invoke the findAll method of an instance of WolvesService', () => {
      wolvesController.findAll();
      expect(wolvesService.findAll).toHaveBeenCalled();
    });

    it('should return the result of invoking the findAll method of an instance of WolvesService', () => {
      expect(wolvesService.findAll).toHaveReturnedWith(
        wolvesController.findAll(),
      );
    });
  });

  describe('findById', () => {
    it('should be a method', () => {
      expect(wolvesController.findById).toEqual(expect.any(Function));
    });
    it('should invoke the findById method of an instance of WolvesService', () => {
      const id = new Types.ObjectId().toString();
      wolvesController.findById(id);
      expect(wolvesService.findById).toHaveBeenCalledWith(id);
    });

    it('should return the result of invoking the findById method of an instance of WolvesService', () => {
      const id = new Types.ObjectId().toString();
      expect(wolvesService.findById).toHaveReturnedWith(
        wolvesController.findById(id),
      );
    });
  });

  describe('create', () => {
    it('should be a method', () => {
      expect(wolvesController.create).toEqual(expect.any(Function));
    });
    it('should invoke the findAll method of an instance of WolvesService', () => {
      const createWolfDto = new CreateWolfDto();
      wolvesController.create(createWolfDto);
      expect(wolvesService.create).toHaveBeenCalledWith(createWolfDto);
    });
    it('should return the result of invoking the create method of an instance of WolvesService', () => {
      const createWolfDto = new CreateWolfDto();
      expect(wolvesService.create).toHaveReturnedWith(
        wolvesController.create(createWolfDto),
      );
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(wolvesController.remove).toEqual(expect.any(Function));
    });
    it('should invoke the findAll method of an instance of WolvesService', () => {
      const id = new Types.ObjectId().toString();
      wolvesController.remove(id);
      expect(wolvesService.remove).toHaveBeenCalledWith(id);
    });

    it('should return the result of invoking the remove method of an instance of WolvesService', () => {
      const id = new Types.ObjectId().toString();
      expect(wolvesService.remove).toHaveReturnedWith(
        wolvesController.remove(id),
      );
    });
  });
});
