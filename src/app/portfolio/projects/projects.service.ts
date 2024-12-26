import { Injectable } from '@angular/core';
import { Constant } from '../../common/constant';
import { UserService } from '../../db/user.service';
import { ProjectsDto } from './projects.model';
import { DatabaseService } from '../../db/database.service';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { ProjectDto } from '../../db/database.model';
import { addDoc } from '@firebase/firestore/lite';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private userService: UserService, private db: DatabaseService) {}

  // async getProjects(): Promise<ProjectsDto> {
  //   let result: ProjectsDto = {};
  //   const docRef = doc(
  //     this.db.database,
  //     Constant.TABLE_PROJECT,
  //     this.userService.getUserId()
  //   );
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     let userDataSnap = docSnap.data();
  //     result = userDataSnap;
  //     console.log('result:', result);
  //   }
  //   return result;
  // }

  async CreateProject(Project: ProjectDto): Promise<boolean> {
    const docRef = doc(
      this.db.database,
      Constant.TABLE_PROJECT,
      this.userService.getUserId()
    );
    Project.UserId = this.userService.currentUser()?.uid || '';
    Project.CreatedOn = new Date();
    Project.ExpireOn = new Date(
      new Date().setDate(
        new Date().getDate() + Constant.PROJECT_EXPIRATION_DAY_DURATION
      )
    );
    Project.TotalSizeAllowed = Constant.TOTAL_STORAGE_ALLOWED_PER_PROJECT;
    Project.IsActive = true;

    let newProjectId = 1;
    if (this.userService.projectDetails()?.length == 0) {
      Project.ProjectId = 1;
    } else {
      let projects = this.userService.projectDetails();
      if (projects != null) {
        newProjectId = Math.max(...projects.map((x) => x?.ProjectId)) + 1;
        Project.ProjectId = newProjectId;
      }
    }
    const userRef = doc(
      this.db.database,
      Constant.TABLE_USER,
      this.userService.getUserId(),
      Constant.TABLE_PROJECT,
      newProjectId.toString()
    );
    return await setDoc(userRef, {
      ...Project,
    })
      .then((res: any) => {
        console.log('new Project created:', res);
        return new Promise<boolean>((resolve, reject) => {
          resolve(true);
        });
      })
      .catch((err: any) => {
        console.log('new Project failed:', err);
        return new Promise<boolean>((resolve, reject) => {
          reject(false);
        });
      });
  }
}
