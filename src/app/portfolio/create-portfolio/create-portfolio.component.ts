import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsService } from '../projects/projects.service';
import $ from 'jquery';

@Component({
  selector: 'create-portfolio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './create-portfolio.component.html',
  styleUrl: './create-portfolio.component.css',
})
export class CreatePortfolioComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(250)]],
      projectType: ['Wedding', [Validators.required]],
      requirement: ['', Validators.required],
      expectedVideoLength: [
        { value: '', disabled: true }
      ],
      UserFilesStorageLocationURL: ['', [Validators.required]],
      preferedAudio: ['', Validators.maxLength(600)],
      additionalNotes: ['', Validators.maxLength(2000)],
    });

    this.projectForm.get('requirement')?.valueChanges.subscribe(() => {
      this.toggleVideoLengthField();
    });
  }

  toggleVideoLengthField(): void {
    const requirement = this.projectForm.get('requirement')?.value;
    const videoLengthField = this.projectForm.get('expectedVideoLength');

    if (requirement == 'VIDEO' || requirement == 'PHOTOVIDEO') {
      videoLengthField?.enable();
    } else {
      videoLengthField?.disable();
      videoLengthField?.reset();
    }
  }

  isVideoRequired(): boolean {
    const requirement = this.projectForm.get('requirement')?.value;
    return requirement === 'VIDEO' || requirement === 'PHOTOVIDEO';
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService
        .CreateProject(this.projectForm.value)
        .then((res: boolean) => {
          console.log("Component SUCC: ", res);
        })
        .catch((res: any) => {
          console.log("Component Err: ", res);
        });
      console.log('Form Submitted', this.projectForm.value);
    }
  }
}
