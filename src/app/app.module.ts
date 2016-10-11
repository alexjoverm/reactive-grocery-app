import { BrowserModule } from '@angular/platform-browser'
import { NgModule }      from '@angular/core'
import { FormsModule }   from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { MaterialModule } from '@angular/material'

import { AppComponent }       from './app.component'
import { ListComponent }      from './components/list/list.component'
import { GroceriesComponent } from './containers/groceries/groceries.component';
import { ListEditComponent } from './components/list-edit/list-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    GroceriesComponent,
    ListEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // Add material module
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
