import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './projects.model';
import { ProjectComponent } from '../project/project.component';
import { CreatePortfolioComponent } from '../create-portfolio/create-portfolio.component';
import { RouterModule } from '@angular/router';
import { ProjectDto } from '../../db/database.model';

@Component({
  selector: 'projects',
  standalone: true,
  imports: [CommonModule, ProjectComponent, CreatePortfolioComponent, RouterModule],
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
