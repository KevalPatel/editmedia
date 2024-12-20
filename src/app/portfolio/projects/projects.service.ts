import { Injectable } from '@angular/core';
import { Constant } from '../../common/constant';
import { UserService } from '../../db/user.service';
import { ProjectsDto } from './projects.model';
import { DatabaseService } from '../../db/database.service';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { ProjectDto } from '../../db/database.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private userService: UserService, private db: DatabaseService) {}

  async getProjects(): Promise<ProjectsDto> {
    let result: ProjectsDto = {};
    const docRef = doc(
      this.db.database,
      Constant.USER_TABLE_NAME,
      this.userService.getUserId()
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let userDataSnap = docSnap.data();
      if (userDataSnap && userDataSnap['Projects']) {
        result = userDataSnap;
      }
      console.log('result:', result);
    }

    return result;
  }

  
  GetNextProjectCount(): number{

    let projects = this.userService.userDetailsDto()?.Projects?.length;
    return projects || 1;
    
    // return new Promise<number>((resolve, reject) => {
    //   resolve(this.userService.userDetailsDto().Projects?.length++);
    // }) 
    // const docRef = doc(
    //   this.db.database,
    //   Constant.USER_TABLE_NAME,
    //   this.userService.getUserId()
    // );

    // return await getDoc(docRef).then((data: any) => {
    //   return new Promise<number>((resolve, reject) => {
    //     resolve(1);
    //   });
    // }).catch((err: any) => {
    //   return new Promise<number>((resolve, reject) => {
    //     reject(0);
    //   });
    // });
  }

  async CreateProject(project: ProjectDto): Promise<boolean> {

    const docRef = doc(
      this.db.database,
      Constant.USER_TABLE_NAME,
      this.userService.getUserId()
    );
    
    let iVal = '\'' + this.GetNextProjectCount().toString()+'\'';
    let docData = {
      'Projects': {
        iVal: project
      }
    };

    

    // let docData1 = {
    //  i : {project}
    // };
    // await updateDoc(docRef, {
    //   Projects: arrayUnion(docData1)
    // })
    
    return await setDoc(docRef, docData, { merge: true }).then((res: any) => {
      console.log('new Project response:', res);
      return new Promise<boolean>((resolve, reject) => {
        resolve(true);
      });
    }).catch((err: any) =>{
      console.log('new Project failed:', err);
      return new Promise<boolean>((resolve, reject) => {
        reject(false);
      });
    });
  }
  
}
