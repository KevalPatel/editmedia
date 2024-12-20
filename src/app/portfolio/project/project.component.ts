import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProjectDto } from '../../db/database.model';

@Component({
  selector: 'project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  projectData = input<ProjectDto>(); 

  
}
