import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  ListType,
  ListDto,
  ListsResponseType,
  ListResponseType,
} from './types';
import { ListService } from './list.service';

@Resolver((of) => ListType)
export class ListResolver {
  constructor(private listService: ListService) {}

  @Query((returns) => ListsResponseType)
  getLists() {
    return this.listService.getLists();
  }

  @Mutation((returns) => ListResponseType)
  createList(@Args('dto') dto: ListDto) {
    return this.listService.createList(dto);
  }

  @Mutation((returns) => ListResponseType)
  updateList(@Args('id') id: string, @Args('dto') dto: ListDto) {
    return this.listService.updateList(id, dto);
  }

  @Mutation((returns) => String)
  deleteList(@Args('id') id: string) {
    return this.listService.deleteList(id);
  }
}
