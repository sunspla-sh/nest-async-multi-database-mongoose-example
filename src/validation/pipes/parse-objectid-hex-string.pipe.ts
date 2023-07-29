import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isObjectIdOrHexString, Types } from 'mongoose';

@Injectable()
export class ParseObjectIdHexStringPipe implements PipeTransform {
  transform(value: any, args: ArgumentMetadata) {
    if (value instanceof Types.ObjectId || !isObjectIdOrHexString(value)) {
      throw new BadRequestException(
        'Validation failed (24 character ObjectId hex string is expected)',
      );
    }
    return value;
  }
}
