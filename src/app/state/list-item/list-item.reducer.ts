import { ActionReducer, Action } from '@ngrx/store'
import { State, initialState } from './list-item.state'

/**
 * ACTION TYPES
 */

export const actionTypes = {
  ADD_LIST_ITEM: 'ADD_LIST_ITEM',
  EDIT_LIST_ITEM: 'EDIT_LIST_ITEM',
  REMOVE_LIST_ITEM: 'REMOVE_LIST_ITEM'
}


/**
 * REDUCER
 */

export const listItemReducer: ActionReducer<State> = (state: State = initialState, action: Action): State => {

  switch (action.type) {
    case actionTypes.ADD_LIST_ITEM: {
      const item = action.payload
      return {
        ids: [...state.ids, item.id],
        entities: Object.assign({}, state.entities, { [item.id]: item })
      }
    }

    case actionTypes.EDIT_LIST_ITEM: {
      const item = Object.assign({}, action.payload)
      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [item.id]: item })
      }
    }

    case actionTypes.REMOVE_LIST_ITEM: {
      const itemId = action.payload
      const entitiesCopy = Object.assign({}, state.entities)
      delete entitiesCopy[itemId]

      return {
        ids: state.ids.filter(id => id !== itemId),
        entities: entitiesCopy
      }
    }

    default:
      return state
  }
}