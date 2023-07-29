import { ObjectIdHexStringConstraint } from './objectid-hex-string.constraint';
import { Types } from 'mongoose';
import { ValidationArguments } from 'class-validator';

describe('ObjectIdHexStringConstraint', () => {
  let objectIdHexStringConstraint: ObjectIdHexStringConstraint;

  beforeEach(() => {
    objectIdHexStringConstraint = new ObjectIdHexStringConstraint();
  });

  it('should be defined', () => {
    expect(objectIdHexStringConstraint).toBeDefined();
  });

  it('should be instance of ObjectIdConstraint', () => {
    expect(objectIdHexStringConstraint).toBeInstanceOf(
      ObjectIdHexStringConstraint,
    );
  });

  describe('validate', () => {
    it('should be a method', () => {
      expect(objectIdHexStringConstraint.validate).toEqual(
        expect.any(Function),
      );
    });

    it('should return true when passed a 24 character ObjectId hex string', () => {
      const objectIdHexString = new Types.ObjectId().toString();
      const fakeVArgs: ValidationArguments = {
        value: '',
        constraints: [],
        targetName: '',
        object: {},
        property: '',
      };

      const validateSpy = jest.spyOn(objectIdHexStringConstraint, 'validate');
      objectIdHexStringConstraint.validate(objectIdHexString, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(true);
    });

    it('should return false when passed anything other than a 24 character ObjectId hex string', () => {
      const validateSpy = jest.spyOn(objectIdHexStringConstraint, 'validate');
      const fakeVArgs: ValidationArguments = {
        value: '',
        constraints: [],
        targetName: '',
        object: {},
        property: '',
      };

      const num = 1;
      objectIdHexStringConstraint.validate(num, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const str = 'haha';
      objectIdHexStringConstraint.validate(str, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const obj = {};
      objectIdHexStringConstraint.validate(obj, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const arr = [];
      objectIdHexStringConstraint.validate(arr, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const fun = () => true;
      objectIdHexStringConstraint.validate(fun, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const n = null;
      objectIdHexStringConstraint.validate(n, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const undef = undefined;
      objectIdHexStringConstraint.validate(undef, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();

      const objectId = new Types.ObjectId();
      objectIdHexStringConstraint.validate(objectId, fakeVArgs);
      expect(validateSpy).toHaveReturnedWith(false);
      expect(validateSpy).toHaveBeenCalledTimes(1); //sanity check
      validateSpy.mockReset();
    });
  });

  describe('defaultMessage', () => {
    it('should be a method', () => {
      expect(objectIdHexStringConstraint.defaultMessage).toEqual(
        expect.any(Function),
      );
    });

    it('should return a string', () => {
      const fakeVArgs: ValidationArguments = {
        value: '',
        constraints: [],
        targetName: '',
        object: {},
        property: '',
      };
      const defaultMessageSpy = jest.spyOn(
        objectIdHexStringConstraint,
        'defaultMessage',
      );
      objectIdHexStringConstraint.defaultMessage(fakeVArgs);
      expect(defaultMessageSpy).toHaveReturnedWith(expect.any(String));
    });
  });
});
