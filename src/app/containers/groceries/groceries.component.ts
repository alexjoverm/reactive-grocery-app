import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { List } from '../../components/list/list.component'
import { ADD_LIST, REMOVE_LIST } from '../../state/list.reducer'

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit {

  private lists$: Observable<List[]>
  private tempList:List = new List()

  constructor(private store: Store<any>) {
    this.lists$ = this.store.select('lists')
  }

  ngOnInit() {
  }

  deleteList(list: List) {
    this.store.dispatch({ type: REMOVE_LIST, payload: list})
  }

  createList(tempList) { // Don't specify List type because of dueDate
    // Create list
    const list:List = Object.assign({}, tempList)
    list.dueDate = new Date(tempList.dueDate) // transform to Date

    // Add list
    this.store.dispatch({ type: ADD_LIST, payload: list})
  }
}
