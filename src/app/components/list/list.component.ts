import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

export class List {
  id: number
  title: string
  dueDate: Date
  items: ListItem[] = []
}

export class ListItem {
  id: number
  title: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list
  @Output() delete: EventEmitter<List> = new EventEmitter<List>()

  ngOnInit() {

  }

  deleteItem() {
    this.delete.emit(this.list)
  }
}
