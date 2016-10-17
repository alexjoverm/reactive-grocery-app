import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { Store } from '@ngrx/store'

import { FirebaseService } from '../../firebase.service.ts'

import { List } from '../../components/list/list.component'
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
    private listSelector: ListSelector,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.listsSub = this.listSelector.getLists()
      .subscribe(lists => {
        this.lists = lists
      })
  }

  ngOnDestroy() {
    this.listsSub.unsubscribe()
  }

  deleteList(list: List) {
    this.firebaseService.deleteList(list)
  }

  createList(tempList) { // Don't specify List type because of dueDate
    // Create list
    const list: List = Object.assign({}, tempList)

    // Add list
    this.firebaseService.addList(list)
  }
}
