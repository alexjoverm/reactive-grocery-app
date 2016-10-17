import { Store } from '@ngrx/store'
import { Injectable, Inject } from '@angular/core'
import 'rxjs/add/operator/mergeMap'

// States
import { AppState }  from './state/app.state'
import { ListState } from './state/list/list.state'
import { ListItemState }  from './state/list-item/list-item.state'

// Actions
import { actionTypes as listItemActions } from './state/list-item/list-item.reducer'
import { actionTypes as listActions } from './state/list/list.reducer'

// AngularFire
import { FirebaseRef } from 'angularfire2'

@Injectable()
export class FirebaseService {

  private listsRef
  private listItemsRef

  constructor(
    private store: Store<AppState>,
    @Inject(FirebaseRef) private firebase
  ) {
    this.listsRef = firebase.database().ref('lists')
    this.listItemsRef = firebase.database().ref('items')
  }

  private parseListSnap(listSnap): ListState {
    const listVal = listSnap.val()
    return Object.assign({}, listVal, {
      id: listSnap.key,
      items: listVal.items ? listVal.items : []
    })
  }

  private parseListItemSnap(listItemSnap): ListItemState {
    const listItemVal = listItemSnap.val()
    return Object.assign({}, listItemVal, {id: listItemSnap.key})
  }

  private setListEvents() {
    this.listsRef.on('child_added', listSnap => {
      console.log(this.parseListSnap(listSnap))
      this.store.dispatch({
        type: listActions.ADD_LIST,
        payload: this.parseListSnap(listSnap)
      })
    })

    this.listsRef.on('child_changed', listSnap => {
      this.store.dispatch({
        type: listActions.EDIT_LIST,
        payload: this.parseListSnap(listSnap)
      })
    })

    this.listsRef.on('child_removed', listSnap => {
      this.store.dispatch({
        type: listActions.REMOVE_LIST,
        payload: listSnap.key
      })
    })
  }

  private setListItemEvents() {
    this.listItemsRef.on('child_added', listItemSnap => {
      this.store.dispatch({
        type: listItemActions.ADD_LIST_ITEM,
        payload: this.parseListItemSnap(listItemSnap)
      })
    })

    this.listItemsRef.on('child_changed', listItemSnap => {
      this.store.dispatch({
        type: listItemActions.EDIT_LIST_ITEM,
        payload: this.parseListItemSnap(listItemSnap)
      })
    })

    this.listItemsRef.on('child_removed', listItemSnap => {
      this.store.dispatch({
        type: listItemActions.REMOVE_LIST_ITEM,
        payload: listItemSnap.key
      })
    })
  }


  // **** PUBLIC API ****

  init () {
    this.setListEvents()
    this.setListItemEvents()
  }

  // List
  addList (list: ListState) {
    this.listsRef.push(list)
  }

  editList (list: ListState) {
    this.listsRef.child(list.id).set(list)
  }

  deleteList (list: ListState) {
    // delete items first
    list.items.forEach(itemId => this.listItemsRef.child(itemId).remove())
    this.listsRef.child(list.id).remove()
  }


  // ListItem
  addListItem (item: ListItemState, list: ListState) {
    const itemRef = this.listItemsRef.push(item)
    this.listsRef.child(list.id).update({
      items: [...list.items, itemRef.key]
    })
  }

  editListItem (item: ListItemState) {
    this.listItemsRef.child(item.id).set(item)
  }

  deleteListItem (item: ListItemState, list: ListState) {
    this.listsRef.child(list.id).update({
      items: list.items.filter(itemId => itemId !== item.id)
    })
    this.listItemsRef.child(item.id).remove()
  }
}
