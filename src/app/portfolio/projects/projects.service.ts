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
import { CommonService } from '../../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private userService: UserService, 
    private db: DatabaseService,
  private commonService: CommonService) {}

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

    Project.projectId = this.commonService.GenerateRandomDigit();
    const projRef = doc(
      this.db.database,
      Constant.TABLE_USER,
      this.userService.getUserId(),
      Constant.TABLE_PROJECT,
      Project.projectId.toString()
    );
    return await setDoc(projRef, {
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

  async EditProject(Project: ProjectDto, projectId: number): Promise<boolean> {
    const docRef = doc(
      this.db.database,
      Constant.TABLE_PROJECT,
      this.userService.getUserId()
    );
    const projRef = doc(
      this.db.database,
      Constant.TABLE_USER,
      this.userService.getUserId(),
      Constant.TABLE_PROJECT,
      projectId.toString()
    );
    return await updateDoc(projRef, {
      ...Project,
    })
      .then((res: any) => {
        console.log('edit Project success:', res);
        return new Promise<boolean>((resolve, reject) => {
          resolve(true);
        });
      })
      .catch((err: any) => {
        console.log('edit Project failed:', err);
        return new Promise<boolean>((resolve, reject) => {
          reject(false);
        });
      });
  }
}
