import { Injectable } from '@nestjs/common';
import { ListDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './list.schema';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

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

    if (!list) return `List with id ${id} does not exist`;

    // delete all items related to list
    // await ItemModel.deleteMany({ list: listId }).exec();

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

    if (!list) return `List with id ${id} does not exist`;

    return { list };
  }
}
