import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isObjectIdOrHexString } from 'mongoose';

@ValidatorConstraint({ name: '', async: false })
export class ObjectIdConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return isObjectIdOrHexString(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a 24 character ObjectId hex string.`;
  }
}
