import { Field, ObjectType } from '@nestjs/graphql';
import { ListType } from './list.type';

@ObjectType('ListsResponse')
export class ListsResponseType {
  @Field(() => [ListType])
  lists: [ListType];

  @Field()
  count: number;
}
