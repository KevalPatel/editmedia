import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { UserService } from '../common/user.service';
import { LoginComponent } from '../user-management/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private userService: UserService = inject(UserService);
  // items$: Observable<any[]>;

  // provider = new GoogleAuthProvider();

  constructor() {
    // const itemsCollection = collection(this.firestore, 'users');
    // this.items$ = collectionData(itemsCollection);
    // console.log(this.items$);
  }
}
