import { combineReducers } from '@ngrx/store'
import { listReducer } from './list/list.reducer'
import { storeLogger } from 'ngrx-store-logger'
import { compose }     from '@ngrx/core'
// import { listItemsReducer } from './list-item/list-item.reducer'

export const appReducer = compose(storeLogger(), combineReducers)({
  lists: listReducer,
  // listItems: listItemsReducer,
})
