/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { List } from 'src/list/list.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ default: false })
  done?: boolean;

  @Prop({ type: Types.ObjectId, ref: 'List' })
  list: List 
}

export const ItemSchema = SchemaFactory.createForClass(Item);