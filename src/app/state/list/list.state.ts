
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

// export const initialState: State = {
//   ids: [],
//   entities: {}
// }

export const initialState: State = {
  ids: [0],
  entities: {
    0: {
      id: 0,
      title: 'test',
      dueDate: new Date(),
      items: []
    }
  }
}
