import { Field, ObjectType, ID } from '@nestjs/graphql';
import { ListType } from 'src/list/list.type';

@ObjectType('Item')
export class ItemType {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ defaultValue: false })
  done?: boolean;

  @Field((type) => ListType)
  list?: string;
}
