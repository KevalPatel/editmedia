import { Routes } from '@angular/router';
import { PhoneVerificationComponent } from './account/phone-verification/phone-verification.component';
import { ContentDescriptionComponent } from './media/content-description/content-description.component';

export const routes: Routes = [
  { path: 'phone-verification', component: PhoneVerificationComponent },
  { path: 'content-description', component: ContentDescriptionComponent },
];
