import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new BadRequestException('Object Id not valid!');
      }
    }

    return value;
  }
}
