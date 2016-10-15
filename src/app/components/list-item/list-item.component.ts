import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core'

export interface ListItem {
  id: number
  title: string
  checked: boolean
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input() item: ListItem
  @Output() update: EventEmitter<ListItem> = new EventEmitter<ListItem>()

  @HostBinding('class.checked')
  get checked() { return this.item.checked }

  updateItem(ev) {
    if (ev) {
      this.item.checked = ev.checked
    }
    this.update.emit(this.item)
  }
}
