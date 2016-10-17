import { ActionReducer, Action } from '@ngrx/store'
import { State, initialState } from './list.state'

/**
 * ACTION TYPES
 */
export const actionTypes = {
  ADD_LIST: 'ADD_LIST',
  EDIT_LIST: 'EDIT_LIST',
  REMOVE_LIST: 'REMOVE_LIST',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
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
      const listId = action.payload
      const entitiesCopy = Object.assign({}, state.entities)
      delete entitiesCopy[listId]

      return {
        ids: state.ids.filter(id => id !== listId),
        entities: entitiesCopy
      }
    }

    case actionTypes.ADD_ITEM: {
      const { itemId, listId } = action.payload
      const entity = Object.assign({}, state.entities[listId])
      entity.items.push(itemId)

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [listId]: entity })
      }
    }

    case actionTypes.REMOVE_ITEM: {
      const { itemId, listId } = action.payload
      const entity = state.entities[listId]
      entity.items = entity.items.filter(id => id !== itemId)

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [listId]: entity })
      }
    }

    default:
      return state
  }
}
