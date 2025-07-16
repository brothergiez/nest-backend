import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class CustomJoiValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !('schema' in metatype)) {
      return value;
    }

    const schema: Joi.Schema = (metatype as any).schema;

    const { error, value: validatedValue } = schema.validate(value, { abortEarly: false });

    if (error) {
      console.log(error)
      const formatted = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      console.log(formatted)

      throw new BadRequestException({
        statusCode: 400,
        message: formatted,
        error: 'Bad Request',
      });
    }

    return validatedValue;
  }
}
