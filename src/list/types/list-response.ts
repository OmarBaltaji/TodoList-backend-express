import { List } from 'src/list/types/list.schema';

export interface ListResponse {
  list: List;
}

export interface ListsResponse {
  count: number;
  lists: List[];
}
