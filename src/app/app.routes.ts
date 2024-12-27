import { Routes } from '@angular/router';
import { PhoneVerificationComponent } from './account/phone-verification/phone-verification.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { CreateProjectComponent } from './portfolio/create-project/create-project.component';
import { LoginComponent } from './account/login/login.component';

export const routes: Routes = [
  { path: 'phone-verification', component: PhoneVerificationComponent, canActivate: [AuthGuard] },
  { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'edit-project/:id', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },
];
