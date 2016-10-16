
export interface ListItemState {
  id: string
  title: string
  checked: boolean
}

export interface State {
  ids: string[],
  entities: { [id: string]: ListItemState }
}

export const initialState: State = {
  ids: [],
  entities: {}
}
