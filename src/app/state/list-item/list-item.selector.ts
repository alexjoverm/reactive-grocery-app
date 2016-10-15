import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'

import { AppState } from '../app.state'

@Injectable()
export class ListItemSelector {

  constructor(private store: Store<AppState>) {}

  private getState() {
    return this.store.select((state: AppState) => state.listItems)
  }

  public getListItemIds() {
    return this.getState().map(state => state.ids)
  }

  public getListItemEntities() {
    return this.getState().map(state => state.entities)
  }
}