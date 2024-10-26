import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user-management/login/login.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // items$: Observable<any[]>;

  constructor() {
    of
    // const itemsCollection = collection(this.firestore, 'users');
    // this.items$ = collectionData(itemsCollection);
    // console.log(this.items$);
  }
}
