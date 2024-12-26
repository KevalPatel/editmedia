import { effect, inject, Injectable, signal } from '@angular/core';
import firebase from 'firebase/compat/app';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  getDocs,
  query,
} from 'firebase/firestore';
import { Constant } from '../common/constant';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseService } from './database.service';
import { ProjectDto, UserProfileDto } from './database.model';
import { ref } from '@angular/fire/database';
import { StorageService } from '../common/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<firebase.User | null>(null);
  isUserLoggedIn: boolean = false;
  userDetails = signal<UserProfileDto | null>(null);
  projectDetails = signal<ProjectDto[] | null>([]);

  constructor(
    private db: AngularFireDatabase,
    private databseService: DatabaseService,
    private storageService: StorageService
  ) {
    effect(() => {
      this.isUserLoggedIn =
        this.currentUser() != null && !this.currentUser()?.isAnonymous;
    });
  }

  async GetCurrentUserData() {
    await onSnapshot(
      doc(this.databseService.database, Constant.TABLE_USER, this.getUserId()),
      (doc) => {
        this.userDetails.set(doc.get('UserData') as UserProfileDto);
      }
    );

    const subColRef = query(
      collection(
        this.databseService.database,
        Constant.TABLE_USER,
        this.getUserId(),
        Constant.TABLE_PROJECT
      )
    );
    await onSnapshot(subColRef, (querySnapshot) => {
      const projects: any = [];
      querySnapshot.forEach((doc) => {
        projects.push(doc.data());
      });
      this.projectDetails.set(projects);
      console.log('Current Projects: ', this.projectDetails());
    });
  }

  getUserId(): string {
    return this.currentUser()?.uid || '';
  }

  IsUserExistsAndActive(): boolean {
    return ((this.userDetails() != null) && this.userDetails()?.IsActive) || false;
  }

  async CreateUserIfNotExists(
    result: firebase.auth.UserCredential
  ): Promise<boolean> {
    let response = false;
    if (result?.user?.uid) {
      const userRef = doc(
        this.databseService.database,
        Constant.TABLE_USER,
        result.user.uid
      );
      const userData = await getDoc(userRef);
      if (!userData.exists()) {
        let UserData = {
          Name: result.user.displayName,
          Email: result.user.email,
          ContactNumber: result.user.phoneNumber,
          CreatedAt: new Date().toISOString(),
          TotalSizeAllowed: Constant.TOTAL_STORAGE_ALLOWED,
          IsActive: true,
          ProfilePic: result.user.photoURL,
          ProviderId: result.user.providerId,
          Role: 'Normal'
        };
        await setDoc(userRef, {
          UserData,
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

  async UpdatePhoneNumber(phoneNumber: string): Promise<boolean> {
    let response = false;
    console.log('USER:: ', this.currentUser());
    this.db
      .object(Constant.TABLE_USER + '/' + this.currentUser()?.uid)
      .update({ ContactNumber: phoneNumber })
      .then((res) => {
        response = true;
      })
      .catch((err) => {
        console.log("ERROR: User's Phone number not updated " + err);
        response = false;
      });
    return response;
  }
}
