import { Component, OnInit } from '@angular/core'
import { List } from 'app/components/list/list.component'

enum Mode {
  show,
  edit,
  create
}

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit {


  private lists: List[]
  private tempList: List

  constructor() {
    this.lists = [
      { id: 0, created: new Date(), title: 'Mercadona sjkljfkls jdflksj lkfdjsklafjdkl;as', items: [
        { id: 0, title: 'Mayonesa' }
      ] },
      { id: 1, created: new Date(), title: 'Consum', items: [] },
      { id: 1, created: new Date(), title: 'Consum', items: [] },
    ]

    this.lists[1].created.setDate(this.lists[1].created.getDate() - 1)


  }

  ngOnInit() {
  }

  deleteList(list: List) {

  }
}
