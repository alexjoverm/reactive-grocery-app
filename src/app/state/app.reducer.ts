import { combineReducers } from '@ngrx/store'
import { storeLogger } from 'ngrx-store-logger'
import { compose }     from '@ngrx/core'
import { listReducer }     from './list/list.reducer'
import { listItemReducer } from './list-item/list-item.reducer'

export const appReducer = compose(storeLogger(), combineReducers)({
  lists: listReducer,
  listItems: listItemReducer,
})
