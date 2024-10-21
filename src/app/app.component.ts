import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'editmedia';

  private firestore: Firestore = inject(Firestore);
  private fireauth: AngularFireAuth = inject(AngularFireAuth);
  currentUser: firebase.User | null = null;
  dummy: boolean = true;

  items$: Observable<any[]>;

  provider = new GoogleAuthProvider();

  constructor() {
    const itemsCollection = collection(this.firestore, 'users');
    this.items$ = collectionData(itemsCollection);
    console.log(this.items$);

    this.fireauth.authState.subscribe((user) => {
      this.currentUser = user;
      console.log('USER: ', user);
    });
  }

  login() {
    // this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.fireauth.signInWithPopup(this.provider).then((result) => {
      var credential = result.credential;
      var user = result.user;
    });

    // this.fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.fireauth.signOut();
  }
}
