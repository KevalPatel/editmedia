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
import { ProjectDto, ProjectStatus } from '../../db/database.model';
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
    Project.userId = this.userService.currentUser()?.uid || '';
    Project.createdOn = new Date();
    Project.expireOn = new Date(
      new Date().setDate(
        new Date().getDate() + Constant.PROJECT_EXPIRATION_DAY_DURATION
      )
    );
    Project.totalSizeAllowed = Constant.TOTAL_STORAGE_ALLOWED_PER_PROJECT;
    Project.isActive = true;
    Project.currentStatus = ProjectStatus.InReview;

    let newProjectId = 1;
    if (this.userService.projectDetails()?.length == 0) {
      Project.projectId = 1;
    } else {
      let projects = this.userService.projectDetails();
      if (projects != null) {
        newProjectId = Math.max(...projects.map((x) => x?.projectId)) + 1;
        Project.projectId = newProjectId;
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
