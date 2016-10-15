import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store'
import { List } from '../../components/list/list.component'
import { actionTypes } from '../../state/list/list.reducer'
import { ListSelector } from '../../state/list/list.selector'

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit, OnDestroy {

  private lists: List[]
  private listsSub: Subscription
  private tempList: List = new List()

  constructor(
    private store: Store<any>,
    private listSelector: ListSelector
  ) {}

  ngOnInit() {
    this.listsSub = this.listSelector.getLists()
      .do(val => console.log(val))
      .subscribe(lists => {
        this.lists = lists
      })
  }

  ngOnDestroy() {
    this.listsSub.unsubscribe()
  }

  deleteList(list: List) {
    this.store.dispatch({ type: actionTypes.REMOVE_LIST, payload: list})
  }

  createList(tempList) { // Don't specify List type because of dueDate
    // Create list
    const list: List = Object.assign({}, tempList)
    list.id = this.lists.length ? this.lists[this.lists.length - 1].id + 1 : 0
    list.dueDate = new Date(tempList.dueDate) // transform to Date

    // Add list
    this.store.dispatch({ type: actionTypes.ADD_LIST, payload: list})
  }
}
