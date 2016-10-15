import { ActionReducer, Action } from '@ngrx/store'
import { State, initialState } from './list.state'

/**
 * ACTION TYPES
 */
export const actionTypes = {
  ADD_LIST: 'ADD_LIST',
  EDIT_LIST: 'EDIT_LIST',
  REMOVE_LIST: 'REMOVE_LIST'
}


/**
 * REDUCER
 */

export const listReducer: ActionReducer<State> = (state: State = initialState, action: Action): State => {

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
