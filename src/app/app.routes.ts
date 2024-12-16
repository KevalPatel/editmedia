import { Routes } from '@angular/router';
import { PhoneVerificationComponent } from './account/phone-verification/phone-verification.component';
import { ContentDescriptionComponent } from './media/content-description/content-description.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'phone-verification', component: PhoneVerificationComponent, canActivate: [AuthGuard] },
  { path: 'content-description', component: ContentDescriptionComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: '', component: AppComponent },
];
