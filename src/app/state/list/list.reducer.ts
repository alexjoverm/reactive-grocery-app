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
      const list = action.payload
      const entitiesCopy = Object.assign({}, state.entities)
      delete entitiesCopy[list.id]

      return {
        ids: state.ids.filter(id => id !== list.id),
        entities: entitiesCopy
      }
    }

    case actionTypes.ADD_ITEM: {
      const { itemId, listId } = action.payload
      console.log(action.payload)
      const entity = Object.assign({}, state.entities[listId])
      entity.items.push(itemId)
      console.log(JSON.stringify(entity, null, 2))

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [listId]: entity })
      }
    }

    case actionTypes.REMOVE_ITEM: {
      const { itemId, list } = action.payload
      const entity = state.entities[list.id]
      entity.items = [...entity.items, itemId]

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [list.id]: entity })
      }
    }

    default:
      return state
  }
}
