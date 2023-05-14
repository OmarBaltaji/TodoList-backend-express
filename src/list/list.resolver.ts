import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ListType } from './list.type';
import { ListDto } from './dto';
import { ListService } from './list.service';

@Resolver((of) => ListType)
export class ListResolver {
  constructor(private listService: ListService) {}

  @Query((returns) => [ListType])
  lists() {
    return this.listService.getLists();
  }

  @Mutation((returns) => ListType)
  createList(@Args('dto') dto: ListDto) {
    return this.listService.createList(dto);
  }

  @Mutation((returns) => ListType)
  updateList(@Args('id') id: string, @Args('dto') dto: ListDto) {
    return this.listService.updateList(id, dto);
  }

  @Mutation((returns) => String)
  deleteList(@Args('id') id: string) {
    return this.listService.deleteList(id);
  }
}
