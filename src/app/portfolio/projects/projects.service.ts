import { Injectable } from '@angular/core';
import { Constant } from '../../common/constant';
import { UserService } from '../../db/user.service';
import { map, Observable, of } from 'rxjs';
import { ProjectDto, ProjectsDto } from './projects.model';
import { DatabaseService } from '../../db/database.service';
import { doc, getDoc } from '@angular/fire/firestore';

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
}
