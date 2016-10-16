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

import { FirebaseService } from '../../firebase.service.ts'

@Component({
  selector: 'app-groceries-detail',
  templateUrl: './groceries-detail.component.html',
  styleUrls: ['./groceries-detail.component.scss']
})
export class GroceriesDetailComponent implements OnInit, OnDestroy {

  listSub: Subscription

  list: List = new List()
  items$: Observable<ListItem[]>
  itemsChecked$: Observable<ListItem[]>

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private listSelector: ListSelector,
    private listItemSelector: ListItemSelector,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // Foreach is like subscribe, but finishes the stream (like a promise)
    this.route.params.forEach((params: Params) => {
      const id = params['id']

      this.listSub = this.listSelector.getList(id)
        .subscribe(list => {
          this.list = list

          const allItems$ = this.listItemSelector
            .getListItemsFromIds(this.list.items)
          this.items$ = allItems$.map(items => items.filter(item => item && !item.checked))
          this.itemsChecked$ = allItems$.map(items => items.filter(item => item && item.checked))
        })

    })
  }

  ngOnDestroy() {
    this.listSub.unsubscribe()
  }

  updateList() {
    this.firebaseService.editList(this.list)
  }

  addItem() {
    this.firebaseService.addListItem({
      id: '',
      title: '',
      checked: false
    }, this.list)
  }

  updateItem(item) {
    this.firebaseService.editListItem(item)
  }

  deleteItem(item) {
    this.firebaseService.deleteListItem(item, this.list)
  }

}
