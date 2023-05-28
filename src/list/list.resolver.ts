import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  ListType,
  ListDto,
  ListsResponseType,
  ListResponseType,
} from './types';
import { ListService } from './list.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/decorators';
import { ObjectId } from 'mongodb';

@UseGuards(JwtGuard)
@Resolver((of) => ListType)
export class ListResolver {
  constructor(private listService: ListService) {}

  @Query((returns) => ListsResponseType)
  getLists(@GetUser('_id') userId: ObjectId) {
    return this.listService.getLists(userId);
  }

  @Mutation((returns) => ListResponseType)
  createList(@Args('dto') dto: ListDto, @GetUser('_id') userId: ObjectId) {
    return this.listService.createList(dto, userId);
  }

  @Mutation((returns) => ListResponseType)
  updateList(
    @Args('id') id: string,
    @Args('dto') dto: ListDto,
    @GetUser('_id') userId: ObjectId,
  ) {
    return this.listService.updateList(id, dto, userId);
  }

  @Mutation((returns) => String)
  deleteList(@Args('id') id: string, @GetUser('_id') userId: ObjectId) {
    return this.listService.deleteList(id, userId);
  }
}
