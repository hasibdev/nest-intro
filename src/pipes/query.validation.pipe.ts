import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class QueryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type == 'query') {
      // Page Query
      if (value.page) {
        if (/^\d+$/.test(value.page)) {
          value.page = parseInt(value.page);
        } else {
          throw new BadRequestException('Invalid Page Query Value!');
        }
      } else {
        value.page = 1;
      }
      // Limit Query
      if (value.limit) {
        if (/^\d+$/.test(value.limit)) {
          value.limit = parseInt(value.limit);
        } else {
          throw new BadRequestException('Invalid Page Query Value!');
        }
      } else {
        value.limit = 10;
      }

      // Sort Validation
      if (value.sort) {
        const s = ['asc', 'desc'];
        const sv = value.sort.toLowerCase();
        if (!s.includes(sv)) {
          throw new BadRequestException('Sort Query should be ASC or DESC');
        }
        if (sv === 'asc') {
          value.sort = 1;
        } else {
          value.sort = -1;
        }
      } else {
        value.sort = 1;
      }

      // Search Query
      if (!value.search) {
        value.search = '';
      }
    }

    return value;
  }
}
