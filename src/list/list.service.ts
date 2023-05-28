import { Injectable, NotFoundException } from '@nestjs/common';
import { ListDto, List, ListResponse, ListsResponse } from './types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/item/types';
import { ObjectId } from 'mongodb';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private listModel: Model<List>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) {}

  async getLists(userId: ObjectId): Promise<ListsResponse> {
    const lists = await this.listModel.find({ user: userId }).populate('items');
    return {
      count: lists.length,
      lists,
    };
  }

  async createList(dto: ListDto, userId: ObjectId): Promise<ListResponse> {
    return {
      list: await this.listModel.create({
        title: dto.title,
        items: [],
        user: userId,
      }),
    };
  }

  async deleteList(id: string, userId: ObjectId): Promise<string> {
    const list = await this.listModel.findOneAndRemove({
      _id: id,
      user: userId,
    });

    if (!list) throw new NotFoundException(`List with id ${id} does not exist`);

    await this.itemModel.deleteMany({ list: list._id }).exec();

    return `List "${list.title}" deleted successfully`;
  }

  async updateList(
    id: string,
    dto: ListDto,
    userId: ObjectId,
  ): Promise<ListResponse> {
    const list = await this.listModel
      .findOneAndUpdate(
        { _id: id, user: userId },
        { title: dto.title },
        { runValidators: true, new: true },
      )
      .populate('items');

    if (!list) throw new NotFoundException(`List with id ${id} does not exist`);

    return { list };
  }
}
