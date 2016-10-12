import { Component, OnInit } from '@angular/core'
import { List } from '../../components/list/list.component'

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit {

  private lists: List[]
  private tempList:List = new List()

  constructor() {
    this.lists = [
      { id: 0, dueDate: new Date(), title: 'Mercadona sjkljfkls jdflksj lkfdjsklafjdkl;as', items: [
        { id: 0, title: 'Mayonesa' }
      ] },
      { id: 1, dueDate: new Date(), title: 'Consum', items: [] },
      { id: 1, dueDate: new Date(), title: 'Consum', items: [] },
    ]

    this.lists[1].dueDate.setDate(this.lists[1].dueDate.getDate() - 1)
  }

  ngOnInit() {
  }

  deleteList(list: List) {
    this.lists = this.lists.filter(l => l !== list)
  }

  createList(tempList) { // Don't specify List type because of dueDate
    const lastId = this.lists.reduce((acum, list) => acum > list.id ? acum : list.id, 0)

    // Create list
    const list:List = Object.assign({}, tempList)
    list.id = lastId + 1
    list.dueDate = new Date(tempList.dueDate) // transform to Date

    // Add list
    this.lists.push(list)
  }
}
