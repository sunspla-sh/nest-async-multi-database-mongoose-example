import { Length, IsInt, Min, Max, Validate } from 'class-validator';
import { ObjectIdConstraint } from '../validation/constraints/objectid.constraint';

export class CreateCatDto {
  @Length(1, 64)
  name: string;

  @IsInt()
  @Min(1)
  @Max(32)
  age: number;

  @Validate(ObjectIdConstraint)
  owner: string;
}
