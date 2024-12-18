import { Injectable } from '@angular/core';
import { UserService } from '../../db/user.service';
import { DatabaseService } from '../../db/database.service';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Constant } from '../../common/constant';
import { ProjectDto } from '../projects/projects.model';

@Injectable({
  providedIn: 'root',
})
export class CreatePortfolioService {
  constructor(private userService: UserService, private db: DatabaseService) {}

  // async GetNextProjectCount(): Promise<number>{
  //   const docRef = doc(
  //     this.db.database,
  //     Constant.USER_TABLE_NAME,
  //     this.userService.getUserId()
  //   );

  //   return await getDoc(docRef).then((data: any) => {
      
  //     return new Promise<number>((resolve, reject) => {
  //       resolve(1);
  //     });
  //   }).catch((err: any) => {
  //     return new Promise<number>((resolve, reject) => {
  //       reject(0);
  //     });
  //   });
  // }

  async CreateProject(project: ProjectDto): Promise<boolean> {

    const docRef = doc(
      this.db.database,
      Constant.USER_TABLE_NAME,
      this.userService.getUserId()
    );
    let docData = {
      'Projects': {
        'project': project
      }
    };

    // let docData1 = {
    //   'project': project
    // };
    // updateDoc(docRef, {
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
