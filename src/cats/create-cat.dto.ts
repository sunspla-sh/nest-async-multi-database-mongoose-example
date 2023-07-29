import { Length, IsInt, Min, Max, Validate } from 'class-validator';
import { ObjectIdHexStringConstraint } from '../validation/constraints/objectid-hex-string.constraint';

export class CreateCatDto {
  @Length(1, 64)
  name: string;

  @IsInt()
  @Min(1)
  @Max(32)
  age: number;

  @Validate(ObjectIdHexStringConstraint)
  owner: string;
}
