import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProjectDto } from '../../db/database.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  constructor(private router: Router){
    
  }
  projectData = input<ProjectDto>(); 

  goToProjectEdit(){
    this.router.navigate(['/edit-project', this.projectData()?.projectId]);
  }
}
