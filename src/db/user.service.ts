import { effect, inject, Injectable, signal } from '@angular/core';
import firebase from 'firebase/compat/app';
import { StorageService } from '../common/storage.service';
import { Observable, of } from 'rxjs';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Constant } from '../common/constant';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<firebase.User | null>(null);
  isUserLoggedIn: boolean | undefined = false;
  private storageService: StorageService = inject(StorageService);

  // database: Firestore = null;

  constructor() {
    effect(() => {
      this.storageService.set(
        this.storageService.CURRENT_APP_USER,
        this.currentUser()
      );
      this.isUserLoggedIn =
        this.currentUser() != null && !this.currentUser()?.isAnonymous;
    });
  }

  async CreateUserIfNotExists(
    result: firebase.auth.UserCredential
  ): Promise<boolean> {
    let response = false;
    let database = getFirestore();
    if (result?.user?.uid) {
      const userRef = doc(database, Constant.USER_TABLE_NAME, result.user.uid);
      const userData = await getDoc(userRef);
      if (!userData.exists()) {
        let userData = {
          Name: result.user.displayName,
          Email: result.user.email,
          ContactNumber: result.user.phoneNumber,
          CreatedAt: new Date().toISOString(),
          TotalSizeAllowed: Constant.TOTAL_STORAGE_ALLOWED,
          IsActive: true,
          ProfilePic: result.user.photoURL,
          ProviderId: result.user.providerId,
          Projects: [],
        };
        await setDoc(userRef, {
          userData,
        })
          .then((res) => {
            response = true;
          })
          .catch((err) => {
            console.log('ERROR: USER NOT CREATED' + err);
            response = false;
          });
      } else {
        console.log('ERROR: USER Already exists');
        response = true;
      }
    } else {
      console.log('ERROR: USER NOT CREATED FROM GOOGLE');
      response = false;
    }
    return response;
  }
}
