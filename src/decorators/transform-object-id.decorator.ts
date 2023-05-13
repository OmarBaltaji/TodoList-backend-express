import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class TransformObjectId implements PipeTransform {
  constructor(private readonly propertyName: string) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    if (value[this.propertyName])
      value[this.propertyName] = new Types.ObjectId(value[this.propertyName]);

    return value;
  }
}
