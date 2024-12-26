import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './db/user.service';
import { inject, Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          console.log('RETURN TRUE FROM AUTH');
          return true;
        } else {
          console.log('RETURN FALSE FROM AUTH');
          this.router.navigate(['login']);
          return false;
        }
      })
    );

    // return new Promise<boolean>((resolve, reject) => {
    //   this.userService.IsUserExistsAndActive().then((res: boolean) => {
    //     return res;
    //   });
    // });

  }
}