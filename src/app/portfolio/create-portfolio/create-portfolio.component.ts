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
      requirePhotoAlbum: [false],
      requireVideo: [false],
      requirePhotoAlbumAndVideo: [false],
      expectedVideoLength: [{ value: '', disabled: true }, Validators.pattern('^[0-9]*$')],
      additionalNotes: ['', Validators.maxLength(2000)],
    });

    // Watch for changes in video-related fields to toggle the expected video length field
    this.projectForm.get('requireVideo')?.valueChanges.subscribe(() => this.toggleVideoLengthField());
    this.projectForm.get('requirePhotoAlbumAndVideo')?.valueChanges.subscribe(() => this.toggleVideoLengthField());
  }

  toggleVideoLengthField(): void {
    const requireVideo = this.projectForm.get('requireVideo')?.value;
    const requirePhotoAlbumAndVideo = this.projectForm.get('requirePhotoAlbumAndVideo')?.value;
    const videoLengthField = this.projectForm.get('expectedVideoLength');

    if (requireVideo || requirePhotoAlbumAndVideo) {
      videoLengthField?.enable();
    } else {
      videoLengthField?.disable();
    }
  }

  isVideoRequired(): boolean {
    return this.projectForm.get('requireVideo')?.value || this.projectForm.get('requirePhotoAlbumAndVideo')?.value;
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log('Form Submitted', this.projectForm.value);
    }
  }
}
