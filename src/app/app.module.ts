import { BrowserModule } from '@angular/platform-browser'
import { NgModule }      from '@angular/core'
import { FormsModule }   from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { MaterialModule } from '@angular/material'
import { routing } from './app.routing'

import { AngularFireModule, FirebaseRef } from 'angularfire2'
import { FirebaseService } from './firebase.service'

import { StoreModule } from '@ngrx/store'
import { appReducer }  from './state/app.reducer'

import { AppComponent }       from './app.component'
import { ListComponent }      from './components/list/list.component'
import { GroceriesComponent } from './containers/groceries/groceries.component';
import { GroceriesDetailComponent } from './containers/groceries-detail/groceries-detail.component';

import { ListSelector } from './state/list/list.selector'
import { ListItemSelector } from './state/list-item/list-item.selector';
import { ListItemComponent } from './components/list-item/list-item.component'

const firebaseConfig = {
  apiKey: 'AIzaSyCMqkfKMU4_AW-CqwugdG1e0V9DX3lZ970',
  authDomain: 'reactive-grocery-app.firebaseapp.com',
  databaseURL: 'https://reactive-grocery-app.firebaseio.com',
  storageBucket: 'reactive-grocery-app.appspot.com',
  messagingSenderId: '57878390698'
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    GroceriesComponent,
    GroceriesDetailComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // Add material module
    MaterialModule.forRoot(),

    // Ngrx/store
    StoreModule.provideStore(appReducer),

    // Angularfire
    AngularFireModule.initializeApp(firebaseConfig),

    // Add routing
    routing
  ],
  providers: [
    ListSelector,
    ListItemSelector,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
