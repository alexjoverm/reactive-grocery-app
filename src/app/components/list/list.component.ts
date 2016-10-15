import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ListItem } from '../list-item/list-item.component'

export class List {
  id: number
  title: string
  dueDate: Date
  items: number[] | ListItem[]
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() list: List
  @Output() delete: EventEmitter<List> = new EventEmitter<List>()

  deleteItem() {
    this.delete.emit(this.list)
  }
}
