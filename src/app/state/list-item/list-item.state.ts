
export interface ListItemState {
  id: number
  title: string
  checked: boolean
}

export interface State {
  ids: number[],
  entities: { [id: number]: ListItemState }
}

export const initialState: State = {
  ids: [],
  entities: {}
}
