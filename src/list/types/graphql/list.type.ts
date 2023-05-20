import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ItemType } from 'src/item/types';

@ObjectType('List')
export class ListType {
  @Field((type) => ID)
  _id: string;

  @Field()
  title: string;

  @Field((type) => [ItemType])
  items: string[];
}
