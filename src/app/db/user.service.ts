import { effect, inject, Injectable, signal } from '@angular/core';
import firebase from 'firebase/compat/app';
import { doc, setDoc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { Constant } from '../common/constant';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseService } from './database.service';
import { ProjectDto, UserDetailsDto, UserProfileDto } from './database.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<firebase.User | null>(null);
  isUserLoggedIn: boolean = false;
  userDetailsDto = signal<UserDetailsDto>({});

  constructor(
    private db: AngularFireDatabase,
    private databseService: DatabaseService
  ) {
    effect(() => {
      this.isUserLoggedIn =
        this.currentUser() != null && !this.currentUser()?.isAnonymous;
    });
  }

  async GetCurrentUserDocument(): Promise<any>{

    await onSnapshot(doc(this.databseService.database,Constant.USER_TABLE_NAME,
      this.getUserId()), doc => {
        
        let userDetails: UserDetailsDto = {
          profile: doc.get('UserData') as UserProfileDto,
          Projects: doc.get('Projects') as ProjectDto[]
        }
        this.userDetailsDto.set(userDetails);
        return new Promise<UserDetailsDto>((resolve, reject) => {
          resolve(userDetails);
        });
      });

    // const userRef = doc(
    //   this.databseService.database,
    //   Constant.USER_TABLE_NAME,
    //   this.getUserId()
    // );
    // const userData = await getDoc(userRef);
    // let userDetails: UserDetailsDto = {
    //   profile: userData.get('UserData') as UserProfileDto,
    //   Projects: userData.get('Projects') as ProjectDto[]
    // }
    // return userDetails;
  }

  getUserId(): string {
    return this.currentUser()?.uid || '';
  }

  async CreateUserIfNotExists(
    result: firebase.auth.UserCredential
  ): Promise<boolean> {
    let response = false;
    if (result?.user?.uid) {
      const userRef = doc(
        this.databseService.database,
        Constant.USER_TABLE_NAME,
        result.user.uid
      );
      const userData = await getDoc(userRef);
      if (!userData.exists()) {
        let Projects: ProjectDto[] = [];
        let UserData = {
          Name: result.user.displayName,
          Email: result.user.email,
          ContactNumber: result.user.phoneNumber,
          CreatedAt: new Date().toISOString(),
          TotalSizeAllowed: Constant.TOTAL_STORAGE_ALLOWED,
          IsActive: true,
          ProfilePic: result.user.photoURL,
          ProviderId: result.user.providerId,
        };
        await setDoc(userRef, {
          UserData, Projects
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
      .object(Constant.USER_TABLE_NAME + '/' + this.currentUser()?.uid)
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
