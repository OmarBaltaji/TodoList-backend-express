import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, EditItemDto } from './types/dto';
import { Item } from './types/item.schema';
import { TransformObjectId } from 'src/decorators';

@Controller('api/v1/items')
export class ItemController {
  // constructor(private item: ItemService) {}

  // @Post('add')
  // createItem(
  //   @Body(new TransformObjectId('listId')) dto: CreateItemDto,
  // ): Promise<Item> {
  //   return this.item.createItem(dto);
  // }

  // @Delete(':id')
  // deleteItem(@Param('id') id: string): Promise<any> {
  //   return this.item.deleteItem(id);
  // }

  // @Patch(':id')
  // // eslint-disable-next-line prettier/prettier
  // updateItem(@Param('id') id: string, @Body() dto: EditItemDto): Promise<Item | string> {
  //   return this.item.updateItem(id, dto);
  // }
}
