/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, CreateItemDto, EditItemDto, ItemResponse } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { List } from 'src/list/types';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
    @InjectModel(List.name) private listModel: Model<List>,
  ) {}

  async createItem(dto: CreateItemDto): Promise<ItemResponse> {
    if (!(await this.listModel.findById(dto.listId)))
      throw new NotFoundException(`List with id ${dto.listId} does not exist`);

    const item = await this.itemModel.create({
      name: dto.name,
      list: new Types.ObjectId(dto.listId),
    });

    await this.listModel.findByIdAndUpdate(
      { _id: dto.listId },
      { $push: { items: item._id } },
      { runValidators: true },
    );

    return { item };
  }

  async deleteItem(id: string): Promise<string> {
    const item = await this.itemModel.findByIdAndDelete(id);

    if (!item) throw new NotFoundException(`Item with id ${id} does not exist`);

    await this.listModel.findByIdAndUpdate(
      { _id: item.list },
      { $pull: { items: item._id } },
    );

    return `Item: "${item.name}" deleted successfully`;
  }

  async updateItem(id: string, dto: EditItemDto): Promise<string | ItemResponse> {
    if (Object.values(dto).length === 0)
      return 'Cannot update item when body is empty';

    const item = await this.itemModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...dto } },
      { runValidators: true, new: true },
    );

    if (!item) throw new NotFoundException(`Item with id ${id} does not exist`);

    return { item };
  }
}
