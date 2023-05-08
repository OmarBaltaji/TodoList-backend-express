import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ListModule } from 'src/list/list.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    ListModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
