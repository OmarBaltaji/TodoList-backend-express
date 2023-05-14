import { Item } from 'src/item/item.schema';
import { List } from 'src/list/list.schema';

export interface ListResponse {
  list: List;
}

export interface ListsResponse {
  count: number;
  lists: List[];
}

export interface ItemResponse {
  item: Item;
}
