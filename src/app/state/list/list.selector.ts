import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { zip } from 'rxjs/observable/zip'

import { AppState } from '../app.state'
import { listEntities } from './list.state'
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

  public getList(id: number) {
    return this.getListEntities()
      .map(listEntities => listEntities[id])
  }

  public getListWithItems(id: number) {
    return zip(
      this.getList(id),
      this.listItemSelector.getListItemEntities()
    )
    .map(([ list, listEntities]) => {
      const items = list.items.map(listId => listEntities[listId])
      return Object.assign({}, list, { items })
    })
  }
}