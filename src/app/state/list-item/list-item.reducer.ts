import { ActionReducer, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { State, initialState } from './list-item.state'

/**
 * ACTION TYPES
 */

export const actionTypes = {
  ADD_LIST_ITEM: 'ADD_LIST_ITEM',
  EDIT_LIST_ITEM: 'EDIT_LIST_ITEM',
  REMOVE_LIST_ITEM: 'REMOVE_LIST_ITEM'
}


/*******
 * REDUCER
 *******/

export const listItemReducer: ActionReducer<State> = (state: State = initialState, action: Action): State => {

  switch (action.type) {
    case actionTypes.ADD_LIST: {
      const list = action.payload
      return {
        ids: [...state.ids, list.id],
        entities: Object.assign({}, state.entities, { [list.id]: list })
      }
    }

    case actionTypes.EDIT_LIST: {
      const list = action.payload
      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [list.id]: list })
      }
    }

    case actionTypes.REMOVE_LIST: {
      const list = action.payload
      const entitiesCopy = Object.assign({}, state.entities)
      delete entitiesCopy[list.id]

      return {
        ids: state.ids.filter(id => id !== list.id),
        entities: entitiesCopy
      }
    }

    default:
      return state
  }
}