import { Length, Validate } from 'class-validator';
import { ObjectIdHexStringConstraint } from '../validation/constraints/objectid-hex-string.constraint';

export class CreateWolfDto {
  @Length(1, 64)
  type: string;

  @Validate(ObjectIdHexStringConstraint)
  owner: string;
}
