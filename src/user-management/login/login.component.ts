import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { UserService } from '../../common/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private firestore: Firestore = inject(Firestore);
  private fireauth: AngularFireAuth = inject(AngularFireAuth);
  public userService: UserService = inject(UserService);

  constructor() {
    this.fireauth.authState.subscribe((user) => {
      this.userService.currentUser.set(user);
      console.log('USER: ', user);
    });
  }

  loginWithGoogle() {
    this.fireauth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log('Logged in with Google:', result.user);
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  }

  logout() {
    this.fireauth.signOut();
  }
}
