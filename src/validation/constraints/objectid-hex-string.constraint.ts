import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isObjectIdOrHexString, Types } from 'mongoose';

@ValidatorConstraint({ name: '', async: false })
export class ObjectIdHexStringConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments): boolean {
    if (value instanceof Types.ObjectId) {
      return false;
    }
    return isObjectIdOrHexString(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a 24 character ObjectId hex string.`;
  }
}
