/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { Item } from 'src/item/item.schema';

export type ListDocument = HydratedDocument<List>;

@Schema()
export class List {
  @Prop({ required: true, trim: true, unique: true })
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }] })
  items: Item[];
}

export const ListSchema = SchemaFactory.createForClass(List);