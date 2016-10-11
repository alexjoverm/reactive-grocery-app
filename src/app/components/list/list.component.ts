import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

export class List {
  id: number
  title: string
  created: Date
  items: ListItem[]
}

export class ListItem {
  id: number
  title: string
}

enum Mode {
  show,
  edit
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: List
  @Output() delete: EventEmitter<List> = new EventEmitter<List>()

  ngOnInit() {

  }

  deleteItem() {
    this.delete.emit(this.list)
  }
}
