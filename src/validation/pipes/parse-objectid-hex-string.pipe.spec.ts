import { ParseObjectIdHexStringPipe } from './parse-objectid-hex-string.pipe';
import { Types } from 'mongoose';
import { ArgumentMetadata } from '@nestjs/common';

describe('ParseObjectIdHexString', () => {
  let parseObjectIdHexStringPipe: ParseObjectIdHexStringPipe;

  beforeEach(() => {
    parseObjectIdHexStringPipe = new ParseObjectIdHexStringPipe();
  });

  it('should be defined', () => {
    expect(parseObjectIdHexStringPipe).toBeDefined();
  });

  it('should be instance of ParseObjectIdHexStringPipe', () => {
    expect(parseObjectIdHexStringPipe).toBeInstanceOf(
      ParseObjectIdHexStringPipe,
    );
  });

  describe('transform', () => {
    it('should be a method', () => {
      expect(parseObjectIdHexStringPipe).toEqual(expect.any(Function));
    });

    it('should return true when invoked with a 24 character object id hex string', () => {
      const objectIdHexString = new Types.ObjectId().toString();
      const fakeArgumentMetadata: ArgumentMetadata = {
        type: 'param',
        metatype: String,
        data: 'id',
      };
      const transformSpy = jest.spyOn(parseObjectIdHexStringPipe, 'transform');

      parseObjectIdHexStringPipe.transform(
        objectIdHexString,
        fakeArgumentMetadata,
      );
      expect(transformSpy).toHaveReturnedWith(true);
    });

    it('should return false when invoked with anything other than a 24 character ObjectId hex string', () => {
      const transformSpy = jest.spyOn(parseObjectIdHexStringPipe, 'transform');
      const fakeArgumentMetadata: ArgumentMetadata = {
        type: 'param',
        metatype: String,
        data: 'id',
      };

      const num = 1;
      parseObjectIdHexStringPipe.transform(num, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const str = 'haha';
      parseObjectIdHexStringPipe.transform(str, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();

      const obj = {};
      parseObjectIdHexStringPipe.transform(obj, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();

      const arr = [];
      parseObjectIdHexStringPipe.transform(arr, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();

      const fun = () => true;
      parseObjectIdHexStringPipe.transform(fun, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();

      const n = null;
      parseObjectIdHexStringPipe.transform(n, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();

      const undef = undefined;
      parseObjectIdHexStringPipe.transform(undef, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();

      const objectId = new Types.ObjectId();
      parseObjectIdHexStringPipe.transform(objectId, fakeArgumentMetadata);
      expect(transformSpy).toHaveReturnedWith(false);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();
    });
  });
});
