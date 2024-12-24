import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserService } from '../../db/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../common/storage.service';
import { UserDto } from './login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fireauth: AngularFireAuth = inject(AngularFireAuth);
  private userService: UserService = inject(UserService);
  private storageService: StorageService = inject(StorageService);

  constructor(private router: Router) {
    this.fireauth.authState.subscribe((user) => {
      this.userService.currentUser.set(user);
      if (!user?.isAnonymous) {
        this.userService.GetCurrentUserData();
      }
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

            // Create object and keep inside storage.
            let storageObj: UserDto = {
              Email: gUser.user?.email,
              Provider: gUser.user?.providerId,
              TokenDetail: gUser,
              Uid: gUser.user?.uid,
              UserName: gUser.user?.displayName,
            };
            if (result) {
              this.storageService.set(
                this.storageService.CURRENT_APP_USER,
                storageObj
              );
              // // if user already have phone number, then navigate to HOME
              // this.router.navigate(['/phone-verification']);

              this.router.navigate(['/projects']);
            }
          });
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  }
}
