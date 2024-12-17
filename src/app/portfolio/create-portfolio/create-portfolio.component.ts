import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'create-portfolio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './create-portfolio.component.html',
  styleUrl: './create-portfolio.component.css',
})
export class CreatePortfolioComponent implements OnInit {

  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(250)]],
      projectType: ['Wedding', [Validators.required]],
      requirement: ['', Validators.required],
      expectedVideoLength: [{ value: '', disabled: true }, Validators.pattern('^[0-9]*$')],
      additionalNotes: ['', Validators.maxLength(2000)],
    });

    // Watch for changes in the 'requirement' field
    this.projectForm.get('requirement')?.valueChanges.subscribe(() => {
      this.toggleVideoLengthField();
    });
  }

  toggleVideoLengthField(): void {
    const requirement = this.projectForm.get('requirement')?.value;
    const videoLengthField = this.projectForm.get('expectedVideoLength');

    if (requirement == 'RequireVideo' || requirement == 'RequirePhotoAlbumAndVideo') {
      videoLengthField?.enable();
    } else {
      videoLengthField?.disable();
      videoLengthField?.reset();
    }
  }

  isVideoRequired(): boolean {
    const requirement = this.projectForm.get('requirement')?.value;
    return requirement === 'RequireVideo' || requirement === 'RequirePhotoAlbumAndVideo';
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log('Form Submitted', this.projectForm.value);
    }
  }
}
