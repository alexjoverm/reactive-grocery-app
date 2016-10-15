import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params }   from '@angular/router'
import { Store } from '@ngrx/store'
import { List } from '../../components/list/list.component'
import { actionTypes as listItemActions } from '../../state/list-item/list-item.reducer'
import { actionTypes as listActions } from '../../state/list/list.reducer'
import { ListSelector } from '../../state/list/list.selector'

@Component({
  selector: 'app-groceries-detail',
  templateUrl: './groceries-detail.component.html',
  styleUrls: ['./groceries-detail.component.scss']
})
export class GroceriesDetailComponent implements OnInit {

  list: List
  id: number

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private listSelector: ListSelector
  ) {}

  ngOnInit() {
    // Foreach is like subscribe, but finishes the stream (like a promise)
    this.route.params.forEach((params: Params) => {
      this.id = +params['id']

      this.listSelector.getListWithItems(this.id)
        .subscribe(list => {
          console.log(list)
          this.list = list
        })
    })
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
      listId: this.id
    }})
  }

  updateItem(item) {
    this.store.dispatch({ type: listItemActions.EDIT_LIST_ITEM, payload: item })
  }

}
