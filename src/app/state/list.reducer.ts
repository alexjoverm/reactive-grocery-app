import { ActionReducer, Action } from '@ngrx/store'
import { List } from '../components/list/list.component'

const initialState = []

export const ADD_LIST    = 'ADD_LIST'
export const EDIT_LIST   = 'EDIT_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'

export const ADD_LIST_ITEM    = 'ADD_LIST_ITEM'
export const EDIT_LIST_ITEM   = 'EDIT_LIST_ITEM'
export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM'

export const listReducer: ActionReducer<List[]> = (state: List[] = initialState, action: Action) => {

  switch (action.type) {
    case ADD_LIST: {
      const list = action.payload
      // take max id + 1
      list.id = state.reduce((acum, list) => acum > list.id ? acum : list.id, 0) + 1
      return [...state, list]
    }


    case EDIT_LIST:
      return state.map(list =>
        list.id === action.payload.id ? action.payload : list
      )

    case REMOVE_LIST:
      return state.filter(list => list.id !== action.payload.id)

    case ADD_LIST_ITEM: {
      const {id, item} = action.payload
      return state.map(list => {
        if (list.id === id) {
          list.items.push(item)
        }
        return list
      })
    }

    case EDIT_LIST_ITEM: {
      const {id, item} = action.payload
      return state.map(list => {
        if (list.id === id) {
          const index = list.items.findIndex(i => i.id === item.id)
          list.items[index] = item
        }
        return list
      })
    }

    case REMOVE_LIST_ITEM: {
      const {id, item} = action.payload
      return state.map(list => {
        if (list.id === id) {
          const index = list.items.findIndex(i => i.id === item.id)
          list.items.splice(index, 1)
        }
        return list
      })
    }

    default:
      return state
  }
}