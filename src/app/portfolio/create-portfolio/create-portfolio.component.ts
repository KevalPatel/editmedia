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
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../common/common.service';
import { UserService } from '../../db/user.service';

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
    private projectService: ProjectsService,
    private toastr: ToastrService,
    private commonService: CommonService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(250)]],
      projectType: ['', [Validators.required]],
      requirement: ['', Validators.required],
      expectedVideoLength: [
        { value: '', disabled: true }
      ],
      userFilesStorageLocationURL: ['', [Validators.required]],
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
          this.toastr.success('Project Created Successfully', 'We will review your data and get in touch with you for further discussion.');
          this.projectForm.reset();
        })
        .catch((res: any) => {
          this.toastr.error('We faced an issue while creating your project. Please refresh the page and try again.')
          console.log("Component Err: ", res);
        }).finally(() => {
          this.commonService.NavigateToTop();
        });
      console.log('Form Submitted', this.projectForm.value);
    }
  }
}
