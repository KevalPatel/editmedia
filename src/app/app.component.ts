import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './account/login/login.component';
import { UserService } from './db/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './common/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  private fireauth: AngularFireAuth = inject(AngularFireAuth);
  public userService: UserService = inject(UserService);
  public storageService: StorageService = inject(StorageService);
  constructor(private router: Router) {
  }
  
  logout() {
    this.fireauth.signOut();
    this.storageService.remove(this.storageService.CURRENT_APP_USER);
    this.router.navigate(['']);
  }
  
}
