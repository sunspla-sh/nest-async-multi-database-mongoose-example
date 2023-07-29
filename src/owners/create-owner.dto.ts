import { Length, IsOptional, IsArray, Validate } from 'class-validator';
import { ObjectIdHexStringConstraint } from '../validation/constraints/objectid-hex-string.constraint';

export class CreateOwnerDto {
  @Length(1, 64)
  firstName: string;

  @Length(1, 64)
  lastName: string;

  @IsOptional()
  @IsArray()
  @Validate(ObjectIdHexStringConstraint, {
    each: true,
  })
  cats: string[];
}
