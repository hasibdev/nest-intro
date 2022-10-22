import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { SortOrder } from 'mongoose';

export type QueryType = {
  page?: number;
  limit?: number;
  sort?: SortOrder;
  search?: string;
};

@Injectable()
export class QueryValidationPipe implements PipeTransform {
  transform(value: QueryType, metadata: ArgumentMetadata) {
    if (metadata.type == 'query') {
      // Page Query
      if (value.page) {
        if (/^\d+$/.test(value.page.toString())) {
          value.page = parseInt(value.page.toString());
        } else {
          throw new BadRequestException('Invalid Page Query Value!');
        }
      } else {
        value.page = 1;
      }
      // Limit Query
      if (value.limit) {
        if (/^\d+$/.test(value.limit.toString())) {
          value.limit = parseInt(value.limit.toString());
        } else {
          throw new BadRequestException('Invalid Page Query Value!');
        }
      } else {
        value.limit = 10;
      }

      // Sort Validation
      if (value.sort) {
        const s = [1, -1, 'asc', 'desc', 'ascending', 'descending'];

        if (/^-?\d+$/.test(value.sort.toString())) {
          value.sort = Number(value.sort.toString()) as SortOrder;
        } else {
          value.sort = value.sort.toString().toLowerCase() as SortOrder;
        }

        if (!s.includes(value.sort)) {
          throw new BadRequestException(
            'Sort Query should be 1|-1|asc|desc|ascending|descending ',
          );
        }
      } else {
        value.sort = 'asc';
      }

      // Search Query
      if (!value.search) {
        value.search = '';
      }
    }

    return value;
  }
}
