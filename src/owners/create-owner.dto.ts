import { Length } from 'class-validator';

export class CreateOwnerDto {
  @Length(1, 64)
  firstName: string;

  @Length(1, 64)
  lastName: string;
}
