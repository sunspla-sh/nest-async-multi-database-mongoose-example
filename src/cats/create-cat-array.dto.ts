import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCatDto } from './create-cat.dto';

export class CreateCatArrayDto {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateCatDto)
  action: CreateCatDto[];
}
