import { Component, Input, Output, EventEmitter } from '@angular/core'

export class List {
  id: number
  title: string
  dueDate: Date
  items: number[]
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
