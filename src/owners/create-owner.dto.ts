import { Length, IsOptional, IsArray, Validate } from 'class-validator';
import { ObjectIdConstraint } from '../validation/constraints/objectid.constraint';

export class CreateOwnerDto {
  @Length(1, 64)
  firstName: string;

  @Length(1, 64)
  lastName: string;

  @IsOptional()
  @IsArray()
  @Validate(ObjectIdConstraint, {
    each: true,
  })
  cats: string[];
}
