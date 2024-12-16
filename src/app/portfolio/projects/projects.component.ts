import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ProjectDto, ProjectsDto } from './projects.model';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [CommonModule, ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {

  projects: ProjectDto[] | null | undefined;
  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .then((result: ProjectsDto) => {
        this.projects = result.Projects;
        console.log('RESULT:: ', result);
      })
      .catch((err) => {
        console.log('ERROR:: ', err);
      });
  }
}
