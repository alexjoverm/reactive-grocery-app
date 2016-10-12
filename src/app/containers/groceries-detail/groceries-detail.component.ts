import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params }   from '@angular/router'
import { List } from '../../components/list/list.component'

@Component({
  selector: 'app-groceries-detail',
  templateUrl: './groceries-detail.component.html',
  styleUrls: ['./groceries-detail.component.scss']
})
export class GroceriesDetailComponent implements OnInit {

  list: number

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.route.params.forEach((params: Params) => {
      let id = +params['id']
    }))
  }

}
