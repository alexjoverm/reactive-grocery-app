import { BrowserModule } from '@angular/platform-browser'
import { NgModule }      from '@angular/core'
import { FormsModule }   from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { MaterialModule } from '@angular/material'
import { routing } from './app.routing'

import { StoreModule } from '@ngrx/store'
import { listReducer } from './state/list.reducer'

import { AppComponent }       from './app.component'
import { ListComponent }      from './components/list/list.component'
import { GroceriesComponent } from './containers/groceries/groceries.component';
import { GroceriesDetailComponent } from './containers/groceries-detail/groceries-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    GroceriesComponent,
    GroceriesDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // Add material module
    MaterialModule.forRoot(),

    StoreModule.provideStore({ lists: listReducer }),

    // Add routing
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
