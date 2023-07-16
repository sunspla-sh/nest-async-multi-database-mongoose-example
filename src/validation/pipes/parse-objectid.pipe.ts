import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isObjectIdOrHexString } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, args: ArgumentMetadata) {
    if (!isObjectIdOrHexString(value)) {
      throw new BadRequestException(
        'Validation failed (24 character ObjectId hex string is expected)',
      );
    }
    return value;
  }
}
