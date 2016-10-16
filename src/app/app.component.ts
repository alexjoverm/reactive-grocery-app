import { Component } from '@angular/core'
import { FirebaseService } from './firebase.service.ts'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private fb: FirebaseService) {
    fb.init()
  }
}
