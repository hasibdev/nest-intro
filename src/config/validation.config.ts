import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const validationConfig = new ValidationPipe({
  errorHttpStatusCode: 422,
  forbidUnknownValues: true,
  transform: true,
  exceptionFactory(errors: ValidationError[]) {
    const error = errors.map(({ value, property, children, constraints }) => ({
      value,
      property,
      children,
      constraints,
    }));
    return new UnprocessableEntityException(error);
  },
});
