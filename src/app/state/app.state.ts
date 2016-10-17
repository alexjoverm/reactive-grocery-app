import {
  State as ListState,
  initialState as listInitialState
} from './list/list.state'

import {
  State as ListItemState,
  initialState as listItemInitialState
} from './list-item/list-item.state'

/**
 * AppState is the root state
 */
export interface AppState {
  lists: ListState,
  listItems: ListItemState
}

export const initialState: AppState = {
  lists: listInitialState,
  listItems: listItemInitialState
}