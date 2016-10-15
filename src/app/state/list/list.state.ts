
export interface ListState {
  id: number
  title: string
  dueDate: Date
  items: number[]
}

export type listEntities = { [id: number]: ListState }

export interface State {
  ids: number[],
  entities: listEntities
}

export const initialState: State = {
  ids: [],
  entities: {}
}
