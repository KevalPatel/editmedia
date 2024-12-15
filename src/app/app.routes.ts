import { Routes } from '@angular/router';
import { PhoneVerificationComponent } from './account/phone-verification/phone-verification.component';
import { ContentDescriptionComponent } from './media/content-description/content-description.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'phone-verification', component: PhoneVerificationComponent },
  { path: 'content-description', component: ContentDescriptionComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', component: AppComponent },
];
