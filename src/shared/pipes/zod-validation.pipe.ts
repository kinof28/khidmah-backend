import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error: ZodError | any) {
      //TODO: remove console log
      console.log(error);
      throw new BadRequestException(
        'Submitted data is not valid,' +
          error.issues[0].path[0] +
          ' ' +
          error.issues[0].message,
      );
    }
  }
}
