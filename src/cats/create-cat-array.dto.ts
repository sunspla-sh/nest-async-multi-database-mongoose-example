import { IsArray, ValidateNested } from 'class-validator';
import { CreateCatDto } from './create-cat.dto';

export class CreateCatArrayDto {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  action: CreateCatDto[];
}
