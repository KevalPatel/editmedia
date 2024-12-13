import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserService } from '../../db/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fireauth: AngularFireAuth = inject(AngularFireAuth);
  public userService: UserService = inject(UserService);

  constructor(private router: Router) {
    this.fireauth.authState.subscribe((user) => {
      this.userService.currentUser.set(user);
    });
  }

  loginWithGoogle() {
    this.fireauth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((gUser) => {
        this.userService
          .CreateUserIfNotExists(gUser)
          .then((result: boolean) => {
            console.log('Logged in with Google:', gUser.user);
            console.log(result);
            this.router.navigate(['/phone-verification']);
          });
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  }

}
