import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './projects.model';
import { ProjectComponent } from '../project/project.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { RouterModule } from '@angular/router';
import { ProjectDto } from '../../db/database.model';
import { UserService } from '../../db/user.service';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    CreateProjectComponent,
    RouterModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  projects: ProjectDto[] | null | undefined;
  constructor(
    private projectsService: ProjectsService,
    public userService: UserService
  ) {
    effect(() => {
      this.projects = this.userService.projectDetails();
    });
  }

  ngOnInit(): void {}
}
