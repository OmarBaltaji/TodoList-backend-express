import { Injectable, NotFoundException } from '@nestjs/common';
import { ListDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './list.schema';
import { Item } from 'src/item/item.schema';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private listModel: Model<List>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) {}

  async getLists() {
    const lists = await this.listModel.find().populate('items');
    return {
      count: lists.length,
      lists,
    };
  }

  async createList(dto: ListDto): Promise<any> {
    return {
      list: await this.listModel.create({ title: dto.title, items: [] }),
    };
  }

  async deleteList(id: string): Promise<string> {
    const list = await this.listModel.findOneAndRemove({ _id: id });

    if (!list) throw new NotFoundException(`List with id ${id} does not exist`);

    await this.itemModel.deleteMany({ list: list._id }).exec();

    return `List "${list.title}" deleted successfully`;
  }

  async updateList(id: string, dto: ListDto) {
    const list = await this.listModel
      .findByIdAndUpdate(
        { _id: id },
        { title: dto.title },
        { runValidators: true, new: true },
      )
      .populate('items');

    if (!list) throw new NotFoundException(`List with id ${id} does not exist`);

    return { list };
  }
}
