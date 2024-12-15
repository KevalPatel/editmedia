import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './db/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
    const router = inject(Router);

    if (userService.isUserLoggedIn == false) {
      console.log('RETURN FALSE');
        router.navigate(['']);
        return false;
    }
    console.log('RETURN TRUE');
    return userService.isUserLoggedIn;
};
