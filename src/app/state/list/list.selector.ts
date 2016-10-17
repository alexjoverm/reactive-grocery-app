import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { zip } from 'rxjs/observable/zip'

import { AppState } from '../app.state'
import { ListItemSelector } from '../list-item/list-item.selector'

@Injectable()
export class ListSelector {

  constructor(
    private store: Store<AppState>,
    private listItemSelector: ListItemSelector
  ) {}

  private getState() {
    return this.store.select((state: AppState) => state.lists)
  }

  public getListIds() {
    return this.getState().map(state => state.ids)
  }

  public getListEntities() {
    return this.getState().map(state => state.entities)
  }

  public getLists() {
    return zip(
      this.getListIds(),
      this.getListEntities(),
    )
    .map(([ listIds, listEntities ]) =>
      listIds.map(id => listEntities[id])
    )
  }

  public getList(id: string) {
    return this.getListEntities()
      .map(listEntities => listEntities[id])
      .filter(list => !!list)
  }
}