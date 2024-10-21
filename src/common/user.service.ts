import { effect, Injectable, signal } from '@angular/core';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // currentUser: firebase.User | null = null;

  currentUser = signal<firebase.User | null>(null);
  isUserLoggedIn: boolean | undefined = false;

  constructor() {
    effect(() => {
      this.isUserLoggedIn = this.currentUser() != null && !this.currentUser()?.isAnonymous;
      console.log('isUserLoggedIn: ', this.isUserLoggedIn);
      
      console.log('currentUser: ', this.currentUser());
    });
  }
}
