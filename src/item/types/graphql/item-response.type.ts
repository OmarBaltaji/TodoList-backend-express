import { Field, ObjectType } from '@nestjs/graphql';
import { ItemType } from './item.type';

@ObjectType('ItemResponse')
export class ItemResponseType {
  @Field(() => ItemType)
  item: ItemType;
}
