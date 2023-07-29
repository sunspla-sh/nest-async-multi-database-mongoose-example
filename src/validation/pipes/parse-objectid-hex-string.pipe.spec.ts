import { ParseObjectIdHexStringPipe } from './parse-objectid-hex-string.pipe';
import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

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
      expect(parseObjectIdHexStringPipe.transform).toEqual(
        expect.any(Function),
      );
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
      expect(transformSpy).toHaveReturnedWith(objectIdHexString);
    });

    it('should return false when invoked with anything other than a 24 character ObjectId hex string', () => {
      const transformSpy = jest.spyOn(parseObjectIdHexStringPipe, 'transform');
      const fakeArgumentMetadata: ArgumentMetadata = {
        type: 'param',
        metatype: String,
        data: 'id',
      };

      const num = 1;
      const numTest = () =>
        parseObjectIdHexStringPipe.transform(num, fakeArgumentMetadata);
      expect(numTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const str = 'haha';
      const strTest = () =>
        parseObjectIdHexStringPipe.transform(str, fakeArgumentMetadata);
      expect(strTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const obj = {};
      const objTest = () =>
        parseObjectIdHexStringPipe.transform(obj, fakeArgumentMetadata);
      expect(objTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const arr = [];
      const arrTest = () =>
        parseObjectIdHexStringPipe.transform(arr, fakeArgumentMetadata);
      expect(arrTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const fun = () => true;
      const funTest = () =>
        parseObjectIdHexStringPipe.transform(fun, fakeArgumentMetadata);
      expect(funTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const n = null;
      const nTest = () =>
        parseObjectIdHexStringPipe.transform(n, fakeArgumentMetadata);
      expect(nTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const undef = undefined;
      const undefTest = () =>
        parseObjectIdHexStringPipe.transform(undef, fakeArgumentMetadata);
      expect(undefTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1); //sanity check
      transformSpy.mockReset();

      const objectId = new Types.ObjectId();
      const objectIdTest = () =>
        parseObjectIdHexStringPipe.transform(objectId, fakeArgumentMetadata);
      expect(objectIdTest).toThrowError(BadRequestException);
      expect(transformSpy).toHaveBeenCalledTimes(1);
      transformSpy.mockReset();
    });
  });
});
