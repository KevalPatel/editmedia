import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, Input, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { ProjectDto } from '../../db/database.model';
import { Constant } from '../../common/constant';

@Component({
  selector: 'create-project',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  @Input() id = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectsService,
    private toastr: ToastrService,
    private commonService: CommonService,
    public userService: UserService,
    private router: Router
  ) {
    effect(() => {
      if (+this.id) {
        let projectDetail = this.userService
          .projectDetails()
          ?.find((x) => x.projectId?.toString() == this.id);
        if (projectDetail) {
          this.projectForm.setValue({
            projectName: projectDetail?.projectName,
            projectType: projectDetail?.projectType,
            requirement: projectDetail?.requirement,
            expectedVideoLength: projectDetail?.expectedVideoLength || 0,
            userFilesStorageLocationURL:
              projectDetail?.userFilesStorageLocationURL,
            preferedAudio: projectDetail?.preferedAudio,
            additionalNotes: projectDetail?.additionalNotes,
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(250)]],
      projectType: ['', [Validators.required]],
      requirement: ['', Validators.required],
      expectedVideoLength: [{ value: '', disabled: true }],
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

  CreateProject(): void {
    if (this.projectForm.valid) {
      this.projectService
        .CreateProject(this.projectForm.value)
        .then((res: boolean) => {
          console.log('Component SUCC: ', res);
          this.toastr.success(
            'Project Created Successfully',
            'We will review your data and get in touch with you for further discussion.'
          );
          this.projectForm.reset();
          this.router.navigate(['/projects']);
        })
        .catch((res: any) => {
          this.toastr.error(
            Constant.SYSTEM_DOWN_ISSUE
          );
          console.log('Component Err: ', res);
        })
        .finally(() => {
          this.commonService.NavigateToTop();
        });
    }
  }

  EditProject() {
    if (this.projectForm.valid) {
      this.projectService
        .EditProject(this.projectForm.value, +this.id)
        .then((res: boolean) => {
          console.log('project editted SUCC: ', res);
          this.toastr.success(
            'Project Updated Successfully',
            'We will review your data and get in touch with you for further discussion.'
          );
          this.projectForm.reset();
          this.router.navigate(['/projects']);
        })
        .catch((res: any) => {
          this.toastr.error(
            Constant.SYSTEM_DOWN_ISSUE
          );
          console.log('Edit Err: ', res);
        })
        .finally(() => {
          this.commonService.NavigateToTop();
        });
    }
  }
}
