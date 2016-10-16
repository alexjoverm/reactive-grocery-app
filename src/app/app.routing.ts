import { Routes, RouterModule } from '@angular/router'

import { GroceriesComponent } from './containers/groceries/groceries.component'
import { GroceriesDetailComponent } from './containers/groceries-detail/groceries-detail.component'

const routes: Routes = [
  { path: '', component: GroceriesComponent },
  { path: 'list/:id', component: GroceriesDetailComponent }
]

export const routing = RouterModule.forRoot(routes)
