import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import {
  CreateItemDto,
  EditItemDto,
  ItemType,
  ItemResponseType,
} from './types';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Resolver((of) => ItemType)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Mutation((returns) => ItemResponseType)
  createItem(@Args('dto') dto: CreateItemDto) {
    return this.itemService.createItem(dto);
  }

  @Mutation((returns) => String)
  deleteItem(@Args('id') id: string) {
    return this.itemService.deleteItem(id);
  }

  @Mutation((returns) => ItemResponseType)
  // eslint-disable-next-line prettier/prettier
  updateItem(@Args('id') id: string, @Args('dto') dto: EditItemDto){
    return this.itemService.updateItem(id, dto);
  }
}
