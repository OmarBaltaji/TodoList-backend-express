import { Field, ObjectType } from '@nestjs/graphql';
import { ListType } from './list.type';

@ObjectType('ListResponse')
export class ListResponseType {
  @Field(() => ListType)
  list: ListType;
}
