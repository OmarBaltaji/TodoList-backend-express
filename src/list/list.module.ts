import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { List, ListSchema } from './types';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/item/types';
import { ListResolver } from './list.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService, ListResolver],
  exports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
})
export class ListModule {}
