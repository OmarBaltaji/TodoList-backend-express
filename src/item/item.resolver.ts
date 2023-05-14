import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { CreateItemDto, EditItemDto } from './dto';
import { Item } from './item.schema';
import { ItemType } from './item.type';

@Resolver((of) => ItemType)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Mutation((returns) => ItemType)
  createItem(@Args('dto') dto: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(dto);
  }

  @Mutation((returns) => String)
  deleteItem(@Args('id') id: string): Promise<any> {
    return this.itemService.deleteItem(id);
  }

  @Mutation((returns) => ItemType)
  // eslint-disable-next-line prettier/prettier
  updateItem(@Args('id') id: string, @Args('dto') dto: EditItemDto): Promise<Item | string> {
    return this.itemService.updateItem(id, dto);
  }
}
