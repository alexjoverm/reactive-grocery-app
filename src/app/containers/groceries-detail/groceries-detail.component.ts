import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params }   from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'

import { List } from '../../components/list/list.component'
import { ListItem } from '../../components/list-item/list-item.component'
import { actionTypes as listItemActions } from '../../state/list-item/list-item.reducer'
import { actionTypes as listActions } from '../../state/list/list.reducer'
import { ListSelector } from '../../state/list/list.selector'
import { ListItemSelector } from '../../state/list-item/list-item.selector'

@Component({
  selector: 'app-groceries-detail',
  templateUrl: './groceries-detail.component.html',
  styleUrls: ['./groceries-detail.component.scss']
})
export class GroceriesDetailComponent implements OnInit, OnDestroy {

  listSub: Subscription

  list: List
  items$: Observable<ListItem[]>
  itemsChecked$: Observable<ListItem[]>

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private listSelector: ListSelector,
    private listItemSelector: ListItemSelector
  ) {}

  ngOnInit() {
    // Foreach is like subscribe, but finishes the stream (like a promise)
    this.route.params.forEach((params: Params) => {
      const id = +params['id']

      this.listSub = this.listSelector.getList(id)
        .subscribe(list => {
          this.list = list

          const allItems$ = this.listItemSelector.getListItemsFromIds(this.list.items)
          this.items$ = allItems$.map(items => items.filter(item => !item.checked))
          this.itemsChecked$ = allItems$.map(items => items.filter(item => item.checked))
        })

    })
  }

  ngOnDestroy() {
    this.listSub.unsubscribe()
  }

  addItem() {
    const id = Math.floor((Math.random() * 999999))
    this.store.dispatch({ type: listItemActions.ADD_LIST_ITEM, payload: {
      id,
      title: '',
      checked: false
    }})

    this.store.dispatch({ type: listActions.ADD_ITEM, payload: {
      itemId: id,
      listId: this.list.id
    }})
  }

  updateItem(item) {
    this.store.dispatch({ type: listItemActions.EDIT_LIST_ITEM, payload: item })
  }

}
