
export interface ListState {
  id: string
  title: string
  dueDate: Date
  items: string[]
}

export type listEntities = { [id: string]: ListState }

export interface State {
  ids: string[],
  entities: listEntities
}

export const initialState: State = {
  ids: [],
  entities: {}
}
