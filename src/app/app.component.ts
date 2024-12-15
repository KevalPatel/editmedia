import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './account/login/login.component';
import { UserService } from './db/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  constructor(private router: Router) {
  }
  
  logout() {
    this.fireauth.signOut();
    this.router.navigate(['']);
  }
  
}
